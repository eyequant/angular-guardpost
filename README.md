angular-guardpost
=================

AngularJS email validation using Mailgun's free API (http://blog.mailgun.com/post/free-email-validation-api-for-web-forms/)

Usage:

```html
  <input type="email" ng-model="email" guardpost-check>

  <!-- ... -->

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.js"></script>
  <script src="angular_guardpost.js"></script>
  <script>
    guardpost.value("mailgunKey", "YOUR_API_KEY");
  </script>
```
