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
    .controller('EditBookmarkCtrl', function (BookmarksModel) {
        var editBookmarkCtrl = this;

        function updateBookmark() {
            editBookmarkCtrl.bookmark = angular.copy(editBookmarkCtrl.editedBookmark);
            BookmarksModel.updateBookmark(editBookmarkCtrl.editedBookmark);

            editBookmarkCtrl.edit();
            editBookmarkCtrl.modal.remove();
        }

        function cancelEditing() {
            editBookmarkCtrl.modal.remove();
        }

        BookmarksModel.getBookmarkById(editBookmarkCtrl.id)
            .then(function (bookmark) {
                if (bookmark) {
                    editBookmarkCtrl.bookmark = bookmark;
                    editBookmarkCtrl.editedBookmark = angular.copy(editBookmarkCtrl.bookmark);
                } else {
                    editBookmarkCtrl.modal.remove();
                }
            });

        editBookmarkCtrl.cancelEditing = cancelEditing;
        editBookmarkCtrl.updateBookmark = updateBookmark;
    })
;
