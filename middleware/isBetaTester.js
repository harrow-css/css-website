export default function({ store, redirect }) {
    if (!store.state.auth.loggedIn) {
      return redirect("/auth/logon");
      
    } else {
      const email = (store.$auth.$storage.getUniversal('jwt_decoded').upn)
      const domain = email.split('@').pop()
        
      console.log(email)
      if (email=='chun-pei_chan@oxcoll.com' || email=="19KainthD@harrowschool.org.uk") {

      } else {
        return redirect("/auth/errors/notbetatester");
      }
    }
  }