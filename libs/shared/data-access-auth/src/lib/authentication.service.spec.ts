// These tests should exercise the services ability to
// marshal credentials from an app into a form suitable for the
// backing authentication service. They should also verify that
// responses from the authentication service are converted to a
// form that is suitable for application use.

// They should NOT
// * attempt to verify that a user can utilize a UI to supply credentials
// * verify that the backing authentication service correctly verifies a user
// * verify the application screen flow in response to login, logout
// and user changes
