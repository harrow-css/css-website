<template>
  <div>
    <h1>
      We're going to build a super cool way of remote connecting to these pc's.
      But until then, find here the credentials for them
    </h1>
    <img
      src="~assets/images/remoteconnect.jpg"
      alt="remoteconnect"
      width="100%"
      height="100%"
    />
  </div>
</template>

<script>
export default {
    middleware: 'isAuthenticated'
}
</script>

