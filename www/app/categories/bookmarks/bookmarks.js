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
    .controller('BookmarksListCtrl', function ($scope, $stateParams, CategoriesModel, BookmarksModel, $ionicModal) {
        var bookmarksListCtrl = this;

        bookmarksListCtrl.isEditMode = false;
        bookmarksListCtrl.title = $stateParams.category || 'Bookmarks';

        CategoriesModel.setCurrentCategory($stateParams.category);

        getBookmarks();

        bookmarksListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
        bookmarksListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
        bookmarksListCtrl.getBookmarks = getBookmarks;

        bookmarksListCtrl.toggleEditMode = function toggleEditMode() {
            bookmarksListCtrl.isEditMode = !bookmarksListCtrl.isEditMode;
        };

        bookmarksListCtrl.goToUrl = function (bookmark) {
            bookmarksListCtrl.currentBookmark = bookmark;

            bookmarksListCtrl.isEditMode
                ? bookmarksListCtrl.showEditModal()
                : window.open(bookmark.url, '_system', 'location=yes');
        };

        bookmarksListCtrl.moveBookmark = function moveBookmark(bookmark, fromIndex, toIndex) {
            bookmarksListCtrl.bookmarks.splice(fromIndex, 1);
            bookmarksListCtrl.bookmarks.splice(toIndex, 0, bookmark);
        };

        bookmarksListCtrl.deleteBookmark = function deleteBookmark(bookmark) {
            BookmarksModel.deleteBookmark(bookmark);

            getBookmarks();
        };

        bookmarksListCtrl.showCreateModal = function showCreateModal(bookmark) {
            showModal('createModal', 'app/categories/bookmarks/create-modal.tmpl.html');
        };

        bookmarksListCtrl.showEditModal = function showEditModal() {
            showModal('editModal', 'app/categories/bookmarks/edit-modal.tmpl.html');
        };

        function showModal(modalName, templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function success(modal) {
                bookmarksListCtrl[modalName] = modal;
                bookmarksListCtrl[modalName].show();
            });
        }

        function getBookmarks() {
            BookmarksModel.getBookmarks()
                .then(function success(bookmarks) {
                    var category = CategoriesModel.getCurrentCategoryName() || $stateParams.category;

                    bookmarksListCtrl.bookmarks =
                        // Replaced "_.with()" with "_.filter()"
                        category ? _.filter(bookmarks, {category: category}) : bookmarks;
                })
        }
    })

;
