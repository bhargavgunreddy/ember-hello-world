
import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list-rentals');

test('should redirect to rentals route', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });
});


test('should list available rentals.', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  });
});

test('should link to information about the company.', function (assert) {
	visit('/');
	click('a:contains("About")');
	andThen(function(){
		assert.equal(currentURL(), '/about', 'should navigate to about section');
	});
});

test('should link to contact information.', function (assert) {
	visit('/');
	click('a:contains("Contact")');
	andThen(function(){
		assert.equal(currentURL(), '/contact', 'should navigate to contact section');
	});
});

test('should filter the list of rentals by city.', function (assert) {
	visit('/');
	fillIn('.list-filter input', 'seattle');
	keyEvent('.list-filter input', 'keyup', 69);
	andThen(function(){
		assert.equal(find('.listings').length, 1, 'should show one listing');
		assert.equal(find('.listings .location:contains("Seattle)').length, 1, 'should show Seattle');
	});
});

test('should show details for a specific rental', function (assert) {
	visit('/');
	click('a:contains("Grand old Mansion")');
	andThen(function(){
		assert.equal(currentURL(), '/rentals/grand-old-mansion', 'should navigate to route');
		assert.equal(find('.show-listing h2').text(), 'Grand Old Mansion', 'should list rental title');
		assert.equal(find('.description').length, 1, 'should list a description of property');
	});
});