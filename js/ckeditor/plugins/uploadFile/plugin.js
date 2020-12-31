CKEDITOR.plugins.add('uploadFile', {
    icons:'uploadFile',
    init: function(editor){
        editor.addCommand(
            'uploadFileToLibrary',
            new CKEDITOR.dialogCommand('uploadFileDialog')
        );
        editor.ui.addButton('uploadFile', {
            label: "Partager le questionnaire",
            command:'uploadFileToLibrary',
            toolbar: 'tools'
        });
        CKEDITOR.dialog.add('uploadFileDialog', this.path+'dialogs/uploadFile.js');
    }
});