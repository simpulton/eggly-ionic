angular.module('categories.bookmarks.create', [])
    .directive('createModal', function createModal() {
        return {
            scope: {},
            templateUrl: 'app/categories/bookmarks/create/bookmark-create.tmpl.html',
            controller: 'CreateBookMarkCtrl',
            controllerAs: 'createBookmarkCtrl',
            bindToController: {
                modal: '=',
                create: '&'
            }
        }
    })
    .controller('CreateBookMarkCtrl', function($state, $stateParams, BookmarksModel) {
        var createBookmarkCtrl = this;

        function returnToBookmarks() {
            $state.go('eggly.categories.bookmarks', {
                category: $stateParams.category
            })
        }

        function cancelCreating() {
            returnToBookmarks();
        }

        function createBookmark() {
            BookmarksModel.createBookmark(createBookmarkCtrl.newBookmark);
            returnToBookmarks();
        }

        function resetForm() {
            createBookmarkCtrl.newBookmark = {
                title: '',
                url: '',
                category: $stateParams.category
            };
        }

        createBookmarkCtrl.cancelCreating = cancelCreating;
        createBookmarkCtrl.createBookmark = createBookmark;

        resetForm();
    });
