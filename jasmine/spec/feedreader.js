/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has valid URL', function() {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch('http');
            });
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has valid name', function() {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('hidden menu element', function() {
            expect(document.body.className).toContain("menu-hidden");
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when clicked', function() {
            const hamburgerIcon = document.querySelector('.menu-icon-link');
            
            //using jQuery click function
            hamburgerIcon.click();
            expect(document.body.className).not.toContain('menu-hidden');
            //when clicked again menu should be invisible again
            hamburgerIcon.click();
            expect(document.body.className).toContain('menu-hidden');
          });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //first, we have to use the beforeEach function to ensure loadFeed is called first
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });   

        //Now we can set the expectation
        it('container has entry after loading', function(done) {
            //check length of array and store it in a variable
            const feedInDOM = document.querySelector('.feed');
            let numberOfFeeds = feedInDOM.getElementsByClassName("entry").length;

            //set expectation using Jasmine's toBeGreaterThan matcher
            expect(numberOfFeeds).toBeGreaterThan(0);
            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         //set variable for the feed in the DOM before reloading
         let feedBeforeRefresh;

         //beforeEach function ensures that loadFeed goes first
         beforeEach(function(done) {
            loadFeed(0, function() {
                //get cóntent before reloading
                const feedBeforeRefresh = document.body.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
         });

         it('new content after loading', function(done) {
            //get content after loading
            const feedAfterRefresh = document.body.querySelector('.feed').innerHTML;

            // set expectation: Old content must differ from new one
            expect(feedBeforeRefresh).not.toBe(feedAfterRefresh);
            done();
         });

    });

}());
