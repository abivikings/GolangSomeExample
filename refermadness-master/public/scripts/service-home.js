var ServicePanel = React.createClass({displayName: "ServicePanel",
  render: function() {
    return (
      React.createElement("div", {className: "search-panel text-center"}, 
        React.createElement("div", {className: "container"}, 
          React.createElement(SearchPage, {selected: this.props.service})
        )
      )
    );
  }
});

var ServiceHome = React.createClass({displayName: "ServiceHome",
  render: function() {
    var waitToPop = /^((?!chrome).)*safari/i.test(navigator.userAgent);
    $(window).off("popstate").on("popstate", function() {
      if (waitToPop) {
        waitToPop = false;
        return;
      }
      window.location = window.location.href;
    });

    return (
      React.createElement("div", {className: "service-home"}, 
        React.createElement(Header, {smallTitle: true}), 
        React.createElement(ServicePanel, {service: JSON.parse($("#content").attr("data-service"))})
      )
    );
  }
});

React.render(
  React.createElement(ServiceHome, null),
  document.getElementById('content')
);