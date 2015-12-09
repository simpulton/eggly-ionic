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
                        controller: 'BookmarksListCtrl',
                        controllerAs: 'bookmarksListCtrl'
                    }
                }
            })
        ;
    })
    .controller('BookmarksListCtrl', function ($scope, $state, $stateParams, CategoriesModel, BookmarksModel, $sanitize, $timeout) {
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
            if (bookmarksListCtrl.isEditMode) {
                $state.go('eggly.categories.bookmarks.edit', {bookmarkId: bookmark.id, category: bookmark.category});
            } else {
                window.open(bookmark.url, '_system', 'location=yes')
            }
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
                    var category = CategoriesModel.getCurrentCategoryName() || $stateParams.category;

                    bookmarksListCtrl.bookmarks =
                        category ? _.where(bookmarks, {category: category}) : bookmarks;
                })

        }

        $scope.$on('bookmarkUpdated', function bookmarkUpdated() {
            getBookmarks();
        });

        $scope.$on('bookmarkCreated', function bookmarkUpdated() {
            getBookmarks();
        });
    })

;
