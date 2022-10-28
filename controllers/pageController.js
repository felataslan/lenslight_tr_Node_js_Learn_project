import { render } from "ejs";

// render indexpage
const getIndexPage=(req,res)=>{
    res.render('index',{
        link:'index',
    });
}
// render about page
const getAboutPage=(req,res)=>{
    res.render('about',{
        link:'about',
    });
}

// // render register page
const getRegisterPage=(req,res)=>{
    res.render('register',{
        link:'register',
    });
}

// render Login page
const getLoginPage=(req,res)=>{
    res.render('login',{
        link:'login',
    });
}

// create cookie 1ms for logout and router homepage(index.ejs)
const getLogout=(req,res)=>{
  res.cookie('jwt','',{
    maxAge:1,
  })
  res.redirect('/')
}


export {getIndexPage,getAboutPage,getRegisterPage,getLoginPage,getLogout};