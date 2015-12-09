angular.module('categories.bookmarks.edit', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories.bookmarks.edit', {
                url: '/bookmarks/:bookmarkId/edit',
                //target the un-named 'ui-view' in PARENT states template
                controller: 'EditBookmarkCtrl as editBookmarkCtrl'
            })
        ;
    })
    .controller('EditBookmarkCtrl', function ($scope, $state, $stateParams, BookmarksModel, $ionicModal) {

        var editBookmarkCtrl = this;

        var modal = $ionicModal.fromTemplateUrl('app/categories/bookmarks/edit/bookmark-edit.tmpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            editBookmarkCtrl.modal = modal;
            editBookmarkCtrl.modal.show();
        })


        $scope.$on('modal.hidden', function (e, modal) {
            if (!editBookmarkCtrl.modalRemoved) {
                editBookmarkCtrl.modalRemoved = true;
                editBookmarkCtrl.modal.remove();
            }
        });

        $scope.$on('modal.removed', function (e, modal) {
            returnToBookmarks();
        });

        function returnToBookmarks() {
            $state.go('eggly.categories.bookmarks', {
                category: $stateParams.category
            });
        }

        function updateBookmark() {
            editBookmarkCtrl.bookmark = angular.copy(editBookmarkCtrl.editedBookmark);
            BookmarksModel.updateBookmark(editBookmarkCtrl.editedBookmark);

            $scope.$emit('bookmarkUpdated');

            editBookmarkCtrl.modalRemoved = true;
            editBookmarkCtrl.modal.remove();
        }

        function cancelEditing() {
            editBookmarkCtrl.modalRemoved = true;
            editBookmarkCtrl.modal.remove();
        }

        BookmarksModel.getBookmarkById($stateParams.bookmarkId)
            .then(function (bookmark) {
                if (bookmark) {
                    editBookmarkCtrl.bookmark = bookmark;
                    editBookmarkCtrl.editedBookmark = angular.copy(editBookmarkCtrl.bookmark);
                } else {
                    returnToBookmarks();
                }
            });

        editBookmarkCtrl.cancelEditing = cancelEditing;
        editBookmarkCtrl.updateBookmark = updateBookmark;
    })
;
