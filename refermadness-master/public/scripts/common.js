var Result = React.createClass({displayName: "Result",
  getInitialState: function() {
    return {
      service: this.props.data,
    };
  },
  viewFull: function() {
    this.props.onSelected(this.state.service);
  },
  render: function() {
    return (
      React.createElement("div", {className: "search-result col-md-3-point-5 col-sm-6 col-xs-12", onClick: this.viewFull}, 
        React.createElement("h2", null, 
          this.state.service.Name
        ), 
        React.createElement("h5", null, 
          this.state.service.Description
        ), 
        React.createElement("h4", null, 
          this.state.service.URL
        )
      )
    );
  }
});

var MoreResults = React.createClass({displayName: "MoreResults",
  render: function() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      React.createElement("div", {className: "more-results row"}, 
        React.createElement("div", {className: "col-xs-12 text-center"}, 
          React.createElement("button", {className: "btn btn-link btn-lg", onClick: this.props.onMore}, 
            React.createElement("span", {className: "glyphicon glyphicon-chevron-down"}), 
            "Load More"
          )
        )
      )
    );
  }
});

var Title = React.createClass({displayName: "Title",
  render: function() {
    return (
      React.createElement("div", {className: "title text-center"}, 
        React.createElement("a", {href: "/", alt: "Return to home page."}, 
          "Refer Madness"
        )
      )
    )
  }
});

var SmallTitle = React.createClass({displayName: "SmallTitle",
  render: function() {
    return (
      React.createElement("div", {className: "shrink title text-center"}, 
        React.createElement("a", {href: "/", alt: "Return to home page."}, 
          "Refer Madness"
        )
      )
    )
  }
});

var TitleArea = React.createClass({displayName: "TitleArea",
  render: function() {
    if (this.props.smallTitle) {
      return (
        React.createElement("div", {className: "col-sm-offset-2 col-sm-8 col-xs-12"}, 
          React.createElement(SmallTitle, null)
        )
      )
    } else {
      return (
        React.createElement("div", {className: "col-sm-offset-2 col-sm-8 col-xs-12"}, 
          React.createElement(Title, null)
        )
      )
    }
  }
});

var LoginButton = React.createClass({displayName: "LoginButton",
  togglePanel: function() {
    if (window.location.pathname === "/") {
      $(".title").toggleClass("shrink fast");
    }
    $("#authenticate-panel").collapse('toggle');
  },
  render: function() {
    return (
      React.createElement("div", {className: "col-xs-12 col-sm-2 text-center"}, 
        React.createElement("button", {className: "login-btn btn btn-default", "data-toggle": "collapse", onClick: this.togglePanel, 
                "aria-expanded": "false", "aria-controls": "authenticate-panel"}, 
          React.createElement("span", {className: "glyphicon glyphicon-lock"}), 
          "Sign Up or Log In"
        )
      )
    )
  }
});

var AccountButton = React.createClass({displayName: "AccountButton",
  render: function() {
    return (
      React.createElement("a", {className: "btn btn-default account-btn", href: "/account"}, 
        React.createElement("span", {className: "glyphicon glyphicon-user"}), 
        "Account"
      )
    );
  }
});

var LogoutButton = React.createClass({displayName: "LogoutButton",
  render: function() {
    return (
      React.createElement("a", {className: "btn btn-default logout-btn", href: "/logout"}, 
        React.createElement("span", {className: "glyphicon glyphicon-off"}), 
        "Log out"
      )
    );
  }
});

var AuthenticatePanel = React.createClass({displayName: "AuthenticatePanel",
  toggleFAQ: function() {
    $("#login-faq").collapse("toggle");
  },
  authenticate: function() {
    window.location.href = "/login?returnURL=" + encodeURIComponent(window.location.pathname + window.location.search);
  },
  render: function() {
    return (
      React.createElement("div", {className: "row collapse", id: "authenticate-panel"}, 
        React.createElement("div", {className: "col-xs-12 text-center"}, 
          React.createElement("h2", null, React.createElement("strong", null, "Let's get you authenticated."), React.createElement("span", {className: "glyphicon glyphicon-question-sign", onClick: this.toggleFAQ})), 
          React.createElement("div", {id: "login-faq", className: "container collapse"}, 
            React.createElement("div", {className: "login-faq-question"}, React.createElement("strong", null, "Why should I?")), 
            React.createElement("div", {className: "login-faq-answer"}, "Authentication helps prevent malicious users from submitting bad or duplicate referral codes and prevents robots from taking over the site."), 
            React.createElement("div", {className: "login-faq-question"}, React.createElement("strong", null, "Why Google?")), 
            React.createElement("div", {className: "login-faq-answer"}, "Google has a respectable history of protecting user passwords. Authenticating with Google means that Refer Madness will never see your password. It also means one less password for you to remember (and, eventually, forget)."), 
            React.createElement("div", {className: "login-faq-question"}, React.createElement("strong", null, "Where's the legal information?")), 
            React.createElement("div", {className: "login-faq-answer"}, "You can view the privacy policy and terms of service on ", React.createElement("a", {href: "/legal"}, "the legal page"), ".")
          ), 
          React.createElement("button", {className: "btn btn-default btn-lg btn-google", onClick: this.authenticate}, 
            React.createElement("span", {className: "glyphicon google-plus"}), 
            "Sign in with Google"
          ), 
          React.createElement("h5", null, "By signing in using the link above, you agree to the ", React.createElement("a", {href: "/legal"}, "Terms and Conditions"), ".")
        )
      )
    );
  }
});

var Header = React.createClass({displayName: "Header",
  getInitialState: function() {
    return {
      loggedIn: $("body").attr("data-logged-in") === "true"
    }
  },
  render: function() {
    if (this.state.loggedIn) {
      return (
        React.createElement("div", {className: "header"}, 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement(TitleArea, {smallTitle: this.props.smallTitle}), 
              React.createElement("div", {className: "text-center"}, 
                React.createElement(AccountButton, null), 
                React.createElement(LogoutButton, null)
              )
            )
          )
        )
      )
    } else {
      return (
        React.createElement("div", {className: "header"}, 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement(TitleArea, {smallTitle: this.props.smallTitle}), 
              React.createElement(LoginButton, null)
            ), 
            React.createElement(AuthenticatePanel, null)
          )
        )
      )
    }
  }
});