<template>
  <div>
    <!-- DEPS -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection"></script>

    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Gravitron</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Try our pushup counter
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="spinner-border" role="status" v-if="loading">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div class="container text-center">
      <div>
        <div>
          <video
            id="videoElement"
            autoplay="true"
            style="display: none"
          ></video>

          
        </div>
        <div>
            <div v-show="!loading">
              <div class="largevalue" id="indicator_pushups">Pushups: 0</div>
              <div class="largevalue" id="indicator_position">Position:</div>
            </div>
            <div v-show="error">
              {{ error }}
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.largevalue {
  font-size: 3rem;
}
.secondarystyledcard > h1 {
  font-size: 2rem;
}

.secondarystyledcard > p {
  font-size: 1rem;
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7a7d7d;
  color: #fffbfe;
}
</style>

<script>
export default {
  data() {
    return {
      loading: true,
      error: null,
    }
  },
  mounted() {
    const utils = {
      createElement: (type, attributes) => {
        let element = document.createElement(type)
        for (var key in attributes) {
          if (key == 'class') {
            element.classList.add.apply(element.classList, attributes[key])
          } else {
            element[key] = attributes[key]
          }
        }
        return element
      },
      drawPoint: (ctx, y, x, r, name) => {
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fillStyle = '#ff0000'
        ctx.fill()

        ctx.font = '7px Arial'
        ctx.fillText(name, x + 7, y + 2)
      },
      getDistance: (p1, p2) => {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
      },
      getPointToLine: (
        shoulderX,
        shoulderY,
        elbow1X,
        elbow1Y,
        elbow2X,
        elbow2Y
      ) => {
        var A = shoulderX - elbow1X
        var B = shoulderY - elbow1Y
        var C = elbow2X - elbow1X
        var D = elbow2Y - elbow1Y

        var dot = A * C + B * D
        var len_sq = C * C + D * D
        var param = -1

        // in case of 0 length line
        if (len_sq != 0) {
          param = dot / len_sq
        }

        var xx, yy

        if (param < 0) {
          xx = elbow1X
          yy = elbow1Y
        } else if (param > 1) {
          xx = elbow2X
          yy = elbow2Y
        } else {
          xx = elbow1X + param * C
          yy = elbow1Y + param * D
        }

        var dx = shoulderX - xx
        var dy = shoulderY - yy
        return Math.sqrt(dx * dx + dy * dy)
      },
    }

    let isLoaded = false
    let currentPosition = 'UP'
    let pushUps = 0

    const canvas = utils.createElement('canvas', {
      id: 'canvas',
    })

    const ctx = canvas.getContext('2d')
    const video = document.getElementById('videoElement')
    const snd = new Audio('a-tone.wav')

    const getPose = async () => {
      const poses = await Detector.estimatePoses(video)

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      if (!isLoaded) {
        document.querySelector('.container p').remove()
        isLoaded = true
      }

      const drawPoint = (y, x, r, name) => {
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fillStyle = '#ff0000'
        ctx.fill()
        ctx.font = '7px Arial'
        ctx.fillText(name, x + 7, y + 2)
      }

      const drawSegment = (pair1, pair2, color, scale) => {
        ctx.beginPath()
        ctx.moveTo(pair1.x * scale, pair1.y * scale)
        ctx.lineTo(pair2.x * scale, pair2.y * scale)
        ctx.lineWidth = 2
        ctx.strokeStyle = color
        ctx.stroke()
      }

      const drawKeypoints = (keypoints) => {
        for (let i = 0; i < keypoints.length; i++) {
          const keypoint = keypoints[i]
          const { y, x } = keypoint
          drawPoint(y, x, 5, keypoint.name)
        }
      }

      if (poses.length) {
        const { keypoints } = poses[0]
        let i = 0
        while (i != keypoints.length) {
          if (keypoints[i]['score'] < 0.3) {
            keypoints.splice(i, 1)
            i--
          }
          i++
        }
        // console.log(keypoints)
        drawKeypoints(keypoints)
        try {
          let elbowPositions = keypoints.filter((k) => {
            return k.name === 'left_elbow' || k.name === 'right_elbow'
          })
          let leftShoulder = keypoints.filter((k) => {
            return k.name === 'left_shoulder'
          })
          let rightShoulder = keypoints.filter((k) => {
            return k.name === 'right_shoulder'
          })

          // console.log(elbowPositions['score'])
          // console.log(elbowPositions)

          // draw segment between left_elbow and right_elbow
          drawSegment(
            { x: elbowPositions[0].x, y: elbowPositions[0].y },
            { x: elbowPositions[1].x, y: elbowPositions[1].y },
            'red',
            canvas.width / video.videoWidth
          )

          let leftShoulderDistance = utils.getPointToLine(
            leftShoulder[0].x,
            leftShoulder[0].y,
            elbowPositions[0].x,
            elbowPositions[0].y,
            elbowPositions[1].x,
            elbowPositions[1].y
          )
          let rightShoulderDistance = utils.getPointToLine(
            rightShoulder[0].x,
            rightShoulder[0].y,
            elbowPositions[0].x,
            elbowPositions[0].y,
            elbowPositions[1].x,
            elbowPositions[1].y
          )

          if (leftShoulderDistance + rightShoulderDistance < 120) {
            currentPosition = 'DOWN'
            document.getElementById('indicator_position').innerText =
              'Position: DOWN'
          } else {
            if (currentPosition === 'DOWN') {
              pushUps++
              snd.currentTime = 0
              snd.play()
              document.getElementById(
                'indicator_pushups'
              ).innerText = `Pushups: ${pushUps}`
            }
            currentPosition = 'UP'
            document.getElementById('indicator_position').innerText =
              'Position: UP'
          }

          // if (currentPosition === "DOWN") {
          //   pushUps++;
          //   document.getElementById(
          //     "indicator_pushups"
          //   ).innerText = `Pushups: ${pushUps}`;
          // }
        } catch {}
      }
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        window.stream = stream
        video.srcObject = stream
        video.addEventListener('loadeddata', (event) => {
          document.querySelector('.container').appendChild(canvas)
          poseDetection
            .createDetector(poseDetection.SupportedModels.MoveNet)
            .then((detector) => {
              window.Detector = detector
              this.loading = false
              setInterval(getPose, 10)
            })
        })
      })
      .catch((error) => {
        ;(this.error = "Couldn't access webcam"), error
      })
  },
  beforeRouteLeave(to, from, next) {
    var canvasElement = document.getElementById('canvas')
    canvasElement.remove()
    next()
  },
}
</script>
