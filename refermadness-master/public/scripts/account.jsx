var UserReferralCodes = React.createClass({
  getInitialState: function() {
    this.fetchServices();
    return {
      services: [],
      total: 0
    };
  },
  fetchServices: function(limit) {
    var that = this,
        skip = this.state ? this.state.services.length : 0;
    $.ajax({
      url: "/account/services?limit=11&skip=" + skip,
      method: "GET",
      contentType: "application/json",
      success: function(data) {
        that.setState({services: that.state.services.concat(data.Services || []), total: data.Total});
      },
      error: function(xhr) {
        console.log("Error fetching user services", xhr)
      }
    });
  },
  standardizeResultHeights: function() {
    var results = $(".search-result");
    if (results.length > 1) {
      var standardHeight = Math.max.apply(null,
        results.map(function(idx, el) {
          return $(el).height();
        }).get());
      results.each(function() {
        $(this).height(standardHeight);
      });
    }
  },
  componentDidUpdate: function() {
    this.standardizeResultHeights();
  },
  viewService: function(service) {
    window.location.href = "/service/" + service.ID;
  },
  render: function() {
    if (this.state.services.length > 0) {
      var that = this;
      var services = this.state.services.map(function (service) {
        return (
          <Result key={service.ID} data={service} onSelected={that.viewService} />
        );
      });
      return (
        <div className="user-referral-codes container">
          <h2 className="text-center">Your Services</h2>
          <div className="row">
            {services}
          </div>
          <MoreResults isVisible={this.state.total > this.state.services.length} onMore={this.fetchServices} />
        </div>
      );
    } else {
      return null;
    }
  }
});

var SwitchAccounts = React.createClass({
  getInitialState: function() {
    return {
      waitForConfirmation: false
    }
  },
  switchAccounts: function() {
    $(".switch-account-information").addClass("fade-out");
    var that = this;
    setTimeout(function() {
      that.setState({waitForConfirmation: true})
    }, 300);
  },
  componentDidUpdate: function() {
    setTimeout(function() {
      $(".switch-account-information").removeClass("fade-out");
    });
  },
  redirect: function() {
    window.location.href = "/account/switch";
  },
  cancel: function() {
    $(".switch-account-information").addClass("fade-out");
    var that = this;
    setTimeout(function() {
      that.setState({waitForConfirmation: false})
    }, 300);
  },
  render: function () {
    if (!this.state.waitForConfirmation) {
      return (
        <div className="row">
          <div className="col-xs-12 text-center switch-account-information">
            <button className="btn btn-default btn-lg switch-accounts" onClick={this.switchAccounts}>
              <span className="glyphicon glyphicon-transfer"></span>
              Use Different Google Identity
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-xs-12 text-center switch-account-information">
            <span className="switch-account-confirmation">Change which Google identity you use to authenticate?</span>
            <button className="btn btn-default btn-lg btn-google switch-accounts" onClick={this.redirect}>
              <span className="glyphicon google-plus"></span>
              Yup, take me to Google
            </button>
            <button className="btn btn-default btn-lg switch-accounts-cancel" onClick={this.cancel}>
              <span className="glyphicon glyphicon glyphicon-ban-circle"></span>
              Nevermind
            </button>
          </div>
        </div>
      );
    }
  }
});

var CancelAccountDeletion = React.createClass({
  render: function() {
    return (
      <button className="btn btn-default btn-lg cancel-account-deletion" onClick={this.props.onClick}>
        <span className="glyphicon glyphicon glyphicon-ban-circle"></span>
        Cancel
      </button>
    );
  }
});

var VerifyAccountDeletionDesparation = React.createClass({
  render: function() {
    return (
      <div className="desperate-delete-message collapse text-center">
        <h3>
          Wait! Don&apos;t go! I never got the chance to tell you, but... <strong>I love you!</strong>
        </h3>
        <button className="btn btn-danger btn-lg" onClick={this.props.onContinue}>
          <span className="glyphicon glyphicon-heart-empty"></span>
          Sorry, pal, but the feeling&apos;s not mutual
        </button>
        <CancelAccountDeletion onClick={this.props.onCancel} />
      </div>
    );
  }
});

var VerifyAccountDeletionApology = React.createClass({
  render: function() {
    return (
      <div className="apologetic-delete-message collapse text-center">
        <h4>
          ...Er. Sorry about that. Overreaction on my part! <em>Please don&apos;t tell my supervisor.</em>
        </h4>
        <button className="btn btn-danger btn-lg" onClick={this.props.onContinue}>
          <span className="glyphicon glyphicon-thumbs-up"></span>
          Sure, I can be discreet, let&apos;s get on with this
        </button>
        <CancelAccountDeletion onClick={this.props.onCancel} />
      </div>
    );
  }
});

var VerifyAccountDeletionWarning = React.createClass({
  validate: function() {
    if ($(".delete-account-validation").val() === this.props.username) {
      $(".warning-delete-message .btn-danger").prop("disabled", false).removeClass("disabled");
    } else {
      $(".warning-delete-message .btn-danger").prop("disabled", true).addClass("disabled");
    }
  },
  componentDidMount: function() {
    this.validate();
  },
  render: function() {
    return (
      <div className="warning-delete-message collapse text-center">
        <h3>
          <strong>Continuing will <em>permanantly delete</em> your account and remove your codes from the system.</strong>
        </h3>
        <h3>
          If you really want to leave, please <strong>enter your Google username in the textbox below</strong>.
        </h3>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4 col-xs-12">
            <form onsubmit="return false;">
              <div className="form-group">
                <input type="text" className="form-control input-lg delete-account-validation"
                       onChange={this.validate} placeholder="Enter your Google identity..." />
              </div>
            </form>
          </div>
        </div>
        <button className="btn btn-danger btn-lg" onClick={this.props.onContinue}>
          <span className="glyphicon glyphicon-fire"></span>
          Permanently Delete Account
        </button>
        <CancelAccountDeletion onClick={this.props.onCancel} />
      </div>
    );
  }
});

var DeleteAccount = React.createClass({
  initiate: function() {
    $(".delete-account").addClass("fade-out");
    $(".desperate-delete-message").collapse("show");
  },
  apologize: function() {
    $(".desperate-delete-message").collapse("hide");
    $(".apologetic-delete-message").collapse("show");
  },
  finalWarning: function() {
    $(".apologetic-delete-message").collapse("hide");
    $(".warning-delete-message").collapse("show");
  },
  confirmDelete: function() {
    window.location.href = "/account/delete";
  },
  rejectDelete: function() {
    $(".desperate-delete-message, .apologetic-delete-message, .warning-delete-message").collapse("hide");
    $(".delete-account").removeClass("fade-out");
  },
  render: function () {
    return (
      <div className="row delete-account-section">
        <div className="col-xs-12 text-center">
          <button className="btn btn-danger btn-lg delete-account" onClick={this.initiate}>
            <span className="glyphicon glyphicon-fire"></span>
            Delete Refer Madness Account
          </button>
        </div>
        <VerifyAccountDeletionDesparation onContinue={this.apologize} onCancel={this.rejectDelete} />
        <VerifyAccountDeletionApology onContinue={this.finalWarning} onCancel={this.rejectDelete} />
        <VerifyAccountDeletionWarning onContinue={this.confirmDelete} onCancel={this.rejectDelete} username={this.props.username} />
      </div>
    );
  }
});

var LoginSettings = React.createClass({
  getInitialState: function() {
    return {
      username: this.props.username
    }
  },
  render: function() {
    return (
      <div className="login-settings container">
        <h2 className="text-center">
          You are currently logged in as <strong>{this.state.username}</strong>
        </h2>
        <SwitchAccounts />
        <DeleteAccount username={this.state.username} />
      </div>
    );
  }
});

var AccountPage = React.createClass({
  render: function() {
    return (
      <div className="account-home">
        <Header smallTitle={true} />
        <LoginSettings username={$("body").attr("data-username")} />
        <UserReferralCodes/>
      </div>
    );
  }
});

React.render(
  <AccountPage />,
  document.getElementById('content')
);