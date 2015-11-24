

document.write(
"<nav class='navbar navbar-inverse navbar-fixed-top' role='navigation'>"+
        "<div class='container'>"+
            "<!-- Brand and toggle get grouped for better mobile display -->"+
         "<div class='navbar-header'>"+
          "      <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>"+
           "         <span class='sr-only'>Toggle navigation</span>"+
            "        <span class='icon-bar'></span>"+
             "       <span class='icon-bar'></span>"+
              "      <span class='icon-bar'></span>"+
               " </button>"+
                "<a class='navbar-brand' href='index.html'>Steps</a>"+
            "</div>"+
            <!-- Collect the nav links, forms, and other content for toggling -->
            "<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>"+
             " <ul class='nav navbar-nav'>"+
			 	"<li class='hideAway'><a href='userProfile.html'>Profile Page</a></li>"+
                "<li class='dropdown hideAway'>"+
                 " <a href='#' class='dropdown-toggle' data-toggle='dropdown'>Service Options<span class='caret'></span></a>"+
                  "<ul class='dropdown-menu' role='menu'>"+
                    "<li><a href='createService.html'>Create Service</a></li>"+
                    "<li><a href='#'>Edit Services</a></li>"+
                    "<li><a href='manageSerPage.html'>Manage Services</a></li>"+
                  "</ul>"+
                "</li>"+
              "</ul>"+
              "<form class='navbar-form navbar-left' role='search'>"+
               " <div class='form-group'>"+
                "  <input type='text' class='form-control' placeholder='Search' style='width:400px;'>"+
                "</div>"+
                "<button style='margin-left:3px;' type='submit' class='btn btn-default'>Submit</button>"+
              "</form>"+
              "<ul class='nav navbar-nav navbar-right ifNotLoggedIn'>"+
               " <li class='dropdown'>"+
                "  <a href='#' class='dropdown-toggle' data-toggle='dropdown'><b>Login</b> <span class='caret'></span></a>"+
                 "   <ul id='login-dp' class='dropdown-menu'>"+
                  "      <li>"+
                   "          <div class='row'>"+
                    "                <div class='col-md-12'>"+
                     "                    <form class='form' role='form' method='post' action='login' accept-charset='UTF-8' id='login-nav'>"+
                      "                          <div class='form-group'>"+
                       "                              <label class='sr-only' for='exampleInputEmail2'>Email address</label>"+
                        "                             <input type='email' class='form-control' id='exampleInputEmail2' placeholder='Email address' required>"+
                         "                       </div>"+
                          "                      <div class='form-group'>"+
                           "                          <label class='sr-only' for='exampleInputPassword2'>Password</label>"+
                            "                         <input type='password' class='form-control' id='exampleInputPassword2' placeholder='Password' required>"+
                             "                        <div class='help-block text-right'><a href=''>Forgot your password ?</a></div>"+
                              "                  </div>"+
                               "                 <div class='form-group'>"+
                                "                     <button type='submit' class='btn btn-primary btn-block'>Sign in</button>"+
                                 "               </div>"+
                                  "       </form>"+
                                   " </div>"+
                                    "<div class='bottom text-center'>"+
                                     "   New here ? <a href='signUp.html'><b>Join Us</b></a>"+
                                    "</div>"+
                             "</div>"+
                     "   </li>"+
                    "</ul>"+


               " </li>"+
              "</ul>"+
              "<ul class='nav navbar-nav navbar-right ifLoggedIn'>"+
               "         <li class='dropdown'>"+
                "          <a href='#' class='dropdown-toggle' data-toggle='dropdown'><b id='navBarName'>Name</b><span class='caret'></span></a>"+
                 "         <ul class='dropdown-menu' role='menu'>"+
                  "          <li><a href='#'>Profile Page</a></li>"+
                   "         <li><a href='#'>Manage Services</a></li>"+
                    "        <li class='divider'></li>"+
                     "       <li><a href='#' onclick='logOut()'>Logout</a></li>"+
                      "    </ul>"+
                       " </li>"+
                      "</ul>"+
            "</div>"+<!-- /.navbar-collapse -->
        "</div>"+
        <!-- /.container -->
    "</nav>");

