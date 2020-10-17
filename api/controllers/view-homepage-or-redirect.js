module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    showLogin: {
      responseType: 'redirect',
      description: 'No necesitamos una página de información. Directo al login.'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function () {


    console.log(this.req.headers);
    console.log(this.req.me);

    if (this.req.me) {
      throw {redirect:'/welcome'};
    }

    throw {showLogin:'/login'};

  }


};
