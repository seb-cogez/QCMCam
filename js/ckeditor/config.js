/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
/*		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'forms' },*/
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' }/*,
		{ name: 'others' }*/
	];

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

		// Set the most common block elements.
		config.format_tags = 'p;h1;h2;h3;pre;h6';
    	//config.extraAllowedContent = "span*,svg*";
		config.allowedContent = {
			$1: {
				// Use the ability to specify elements as an object.
				elements: CKEDITOR.dtd,
				attributes: true,
				styles: true,
				classes: true
			}
		};
		// Simplify the dialog windows.
		config.removeDialogTabs = 'image:advanced;link:advanced';
		config.extraPlugins = 'katex,pastebase64,image2,panelbutton,floatpanel,colorbutton,html5audio,iframe,print,codesnippet,uploadFile';//mathjax
};
