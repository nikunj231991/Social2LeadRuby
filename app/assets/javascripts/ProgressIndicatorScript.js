App = {};

App.ProgressIndicator = {
    Show: function () {
        App.ProgressIndicator._changeDisplay('block');
        $('body').css('overflow-y', 'hidden');
    },

    Hide: function () {
        App.ProgressIndicator._changeDisplay('none');
        $('body').css('overflow-y', 'auto');
    },

    _changeDisplay: function (styleDisplay) {
        var progressDiv = $('#ProgressIndicator');
        if (progressDiv.length == 0)
            return;

        progressDiv[0].style.display = styleDisplay;
    }
};

$().ready(function () {
    App.ProgressIndicator._changeDisplay('none');
});
