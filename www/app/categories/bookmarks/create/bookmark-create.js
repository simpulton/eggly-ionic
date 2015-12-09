angular.module('categories.bookmarks.create', [

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories.bookmarks.create', {
                url: '/bookmarks/create',
                //target the un-named 'ui-view' in PARENT states template
                controller: 'CreateBookMarkCtrl as createBookmarkCtrl'
            })
        ;
    })
    .controller('CreateBookMarkCtrl', function($scope, $state, $stateParams, BookmarksModel, $ionicModal) {
        var createBookmarkCtrl = this;

        $ionicModal.fromTemplateUrl('app/categories/bookmarks/create/bookmark-create.tmpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            createBookmarkCtrl.modal = modal;
            createBookmarkCtrl.modal.show();
        })

        $scope.$on('modal.hidden', function (e, modal) {
            if (!createBookmarkCtrl.modalRemoved) {
                createBookmarkCtrl.modalRemoved = true;
                createBookmarkCtrl.modal.remove();
            }
        });

        $scope.$on('modal.removed', function (e, modal) {
            returnToBookmarks();
        });

        function returnToBookmarks() {
            $state.go('eggly.categories.bookmarks', {
                category: $stateParams.category
            })
        }

        function cancelCreating() {
            createBookmarkCtrl.modalRemoved = true;
            createBookmarkCtrl.modal.remove();
        }

        function createBookmark() {
            BookmarksModel.createBookmark(createBookmarkCtrl.newBookmark);

            createBookmarkCtrl.modalRemoved = true;
            createBookmarkCtrl.modal.remove();

            $scope.$emit('bookmarkCreated');
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
