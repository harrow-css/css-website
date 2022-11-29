export default function({ store, redirect , route}) {
  if (!store.state.auth.loggedIn) {

    /* log the current page route to the console */
    console.log('redirecting to login page from: ' + route.path)

    store.$auth.$storage.setUniversal('redirect', route.path);

    return redirect("/auth/logon");
    
  } else {
    const email = (store.$auth.$storage.getUniversal('jwt_decoded').upn)
    const domain = email.split('@').pop()

    if (domain=='harrowschool.org.uk' || email=='chun-pei_chan@oxcoll.com') {
    } else {
      return redirect("/auth/errors/notharrowschool");
    }
  }
}
