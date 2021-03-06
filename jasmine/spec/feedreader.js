/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function () {
    describe('RSS Feeds', function () {
      /* Ensure  that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it('are defined', function () {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* Loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it('have non empty URLs', () => {
        let goodUrl = true;
        allFeeds.forEach(function (feed) {
          if (!(feed.url && feed.url != '')) {
            goodUrl = false;
          }
        });
        expect(goodUrl).toBe(true);
      });

      /* Loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it('have non empty names', () => {
        let goodName = true;
        allFeeds.forEach(function (feed) {
          if (!(feed.name && feed.name != '')) {
            goodName = false;
          }
        });
        expect(goodName).toBe(true);
      });
    });

    describe('The Menu', () => {
      /* Ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it('is hidden by default', () => {
        expect(
          document.querySelector('body').classList.contains('menu-hidden')
        ).toBe(true);
      });
      /* Ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it('changes visibility when clicked', () => {
        document.querySelector('.menu-icon-link').click();
        expect(
          document.querySelector('body').classList.contains('menu-hidden')
        ).toBe(false);
        document.querySelector('.menu-icon-link').click();
        expect(
          document.querySelector('body').classList.contains('menu-hidden')
        ).toBe(true);
      });
    });
    describe('Initial Entries', () => {
      /* Ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
      beforeEach(done => {
        loadFeed(0, () => {
          done();
        });
      });
      it('loads atleast one single entry in feed container', () => {
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });
    describe('New Feed Selection', () => {
      beforeEach(done => {
        loadFeed(1, () => { 
          window.firstFeed = document.querySelector('.entry-link').innerHTML;
          loadFeed(2, () => {
            window.secondFeed = document.querySelector('.entry-link').innerHTML;
            done();
          });
        });

      });
      /* Ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
      it('changes content when new feed selected', () => {
        expect(window.firstFeed !== window.secondFeed).toBe(true);
      });
    });
  })()
);