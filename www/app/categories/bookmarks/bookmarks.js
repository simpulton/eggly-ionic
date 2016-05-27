angular.module('categories.bookmarks', [
    'categories.bookmarks.create',
    'categories.bookmarks.edit',
    'eggly.models.categories',
    'eggly.models.bookmarks'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories.bookmarks', {
                url: 'categories/:category',
                //target the named 'ui-view' in ROOT (eggly) state named 'bookmarks'
                //to show bookmarks for a specific category
                views: {
                    'bookmarks@': {
                        templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html',
                        controller: 'BookmarksListCtrl as bookmarksListCtrl'
                    }
                }
            })
        ;
    })
    .controller('BookmarksListCtrl', function ($state, $stateParams, CategoriesModel, BookmarksModel) {
        var bookmarksListCtrl = this;

        bookmarksListCtrl.isEditMode = false;
        bookmarksListCtrl.title = $stateParams.category || 'Bookmarks';

        CategoriesModel.setCurrentCategory($stateParams.category);
        getBookmarks();

        bookmarksListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
        bookmarksListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;

        bookmarksListCtrl.toggleEditMode = function toggleEditMode() {
            bookmarksListCtrl.isEditMode = !bookmarksListCtrl.isEditMode;
        };

        bookmarksListCtrl.goToUrl = function (bookmark) {
            bookmarksListCtrl.isEditMode
                ? $state.go('eggly.categories.bookmarks.edit', {bookmarkId: bookmark.id, category: bookmark.category})
                : window.open(bookmark.url, '_system');
        };

        bookmarksListCtrl.moveBookmark = function moveBookmark(bookmark, fromIndex, toIndex) {
            bookmarksListCtrl.bookmarks.splice(fromIndex, 1);
            bookmarksListCtrl.bookmarks.splice(toIndex, 0, bookmark);
        };

        bookmarksListCtrl.deleteBookmark = function deleteBookmark(bookmark) {
            BookmarksModel.deleteBookmark(bookmark);

            getBookmarks();
        }

        function getBookmarks() {
            BookmarksModel.getBookmarks()
                .then(function success(bookmarks) {
                    var category = CategoriesModel.getCurrentCategoryName();

                    bookmarksListCtrl.bookmarks =
                        /* Replaced "_.where()" with "_.filter()" see 
                        https://github.com/lodash/lodash/wiki/Changelog#jan-12-2016--diff--docs
                        for more information */
                        category ? _.filter(bookmarks, {category: category}) : bookmarks;
                })
        }
    })

;
