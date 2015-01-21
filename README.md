#REST API Generator
Master thesis. I guess I will make some people really really happy that it is again in JavaScript. That is irony btw.

##My Goals

	1. Generating shall be language independent (Node, PHP, GO etc).
	2. Advanced template system.
	3. No pre-requests for the generation (installed programs, JVM etc).
	4. The generated REST API shall be delivered with a file allowing automated testing and documentation generation.
	5. Production ready REST API.
	6. GitHub integration (???)
	
##Why?

	1. Fast development. The time can be used on the app development.
	2. Sharing of experience and best practices in REST API development.
	3. Possible to transform any already written REST API to this approach.
	4. Documentation and auto-testing.

##Research "value"

Is it possible to generate a fully functional production ready REST API with an advanced templating system?

##What is advanced templating system?
The existing solution has a couple of imperfections:

	1. one file = one template
	2. the generated code is ugly
	3. no template snippets
	
I suggest three different types of templates:

![Picture with templates](https://raw.githubusercontent.com/RassaLibre/rest-api-generator/master/docs/templates.jpg "Three different type of templates")

	N - Normal templates
	A - Atomic templates which can be used in other templates
	D - Duplicated templates which gets duplicated according to a given rule
	

##Pre-Requests for development
Node, Mocha