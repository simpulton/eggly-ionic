angular.module('categories.bookmarks.edit', [])
    .directive('editModal', function editBookmark() {
        return {
            scope: {},
            templateUrl: 'app/categories/bookmarks/edit/bookmark-edit.tmpl.html',
            controller: 'EditBookmarkCtrl',
            controllerAs: 'editBookmarkCtrl',
            bindToController: {
                modal: '=',
                id: '=',
                edit: '&'
            }
        }
    })
    .controller('EditBookmarkCtrl', function ($state, $stateParams, BookmarksModel) {
        var editBookmarkCtrl = this;

        function returnToBookmarks() {
            $state.go('eggly.categories.bookmarks', {
                category: $stateParams.category
            })
        }

        function updateBookmark() {
            editBookmarkCtrl.bookmark = angular.copy(editBookmarkCtrl.editedBookmark);
            BookmarksModel.updateBookmark(editBookmarkCtrl.editedBookmark);
            returnToBookmarks();
        }

        function cancelEditing() {
            returnToBookmarks();
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
