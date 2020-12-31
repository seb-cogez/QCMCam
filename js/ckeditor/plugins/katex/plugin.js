CKEDITOR.plugins.add('katex', {
    icons:'katex',
    lang:"de,en,es,fr",
    requires: "dialog,widget",
    hidpi: !0,
    init:function(editor){
        var lang = editor.lang.katex;
        //editor.addCommand('insertKatex', new CKEDITOR.dialogCommand('katexDialog'));
        editor.widgets.add('katex', {
            button:lang.button,
            template:'<span class="math-tex">x = \\dfrac{-b \\pm \\sqrt{b^2-4ac}}{2a}</span>',
            defaults:{
                formula:'none'
            },
            parts:{
                span:'span'
            },
            requiredContent:'span(math-tex)',
            dialog:'katex',
            allowedContent:'math*; maction; maligngroup; malignmark; menclose; merror; mfenced; mglyph; mlabeledtr; mlongdiv; mmultiscripts; mover; mpadded; mphantom; mroot; '+
            'mscarries; mscarry; msgroup; msline; mspace; msrow; mstack; mstyle; msub; msup; msubsup; mtable; mtd; mtr; munderover; annotation-xml; mrow*; munder*; mtext*; msqrt*; mfrac*; mn*; mo*; mi*; annotation*; semantics*; '+
            'span*; svg*; path*',
            upcast:function(elt){
                return elt.name=="span" && elt.hasClass("math-tex");
            },
            downcast:function(elt){
                elt.children[0].replaceWith(new CKEDITOR.htmlParser.text(CKEDITOR.tools.htmlEncode(this.data.formula)));
                delete elt;
            },
            init:function(){
                var tex = (this.data.formula!=='none')?this.data.formula:this.element.getText();
                if(tex!==""){
                    this.setData('formula', tex);
                    katex.render(tex,this.element.$);
                }
            },
            data:function(){
                katex.render(this.data.formula,this.element.$,{throwOnError: false});
            }
        });
        CKEDITOR.dialog.add('katex', this.path+'dialogs/katex.js');
    }
})