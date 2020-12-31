CKEDITOR.dialog.add('katex', function(editor){
    var preview,
        lang = editor.lang.katex,
        shadow,eltId=editor.id;
    return{
        title: lang.title,
		minWidth: 350,
		minHeight: 100,
        contents: [{
                id:'mathEq',
                elements : [{
                    id:'equation',
                    type:'textarea',
                    label: lang.dialogInput,
                    onLoad: function () {
						var that = this;
						if (!(CKEDITOR.env.ie && CKEDITOR.env.version == 8)) {
							this.getInputElement().on('keyup', function () {
                                var tex = that.getInputElement().getValue().trim();
                                katex.render(tex, preview,{
                                    throwOnError: false,
                                    errorColor: "#FFF"
                                  });
							});
						}
                    },
                    setup:function(widget){
                        if(widget.data.formula !== ""){
                            var tex = widget.data.formula.trim();
                            this.setValue(tex);
                            katex.render(tex, preview,{
                                throwOnError: false,
                                errorColor: "#FFF"
                            });
                        } else {
                            preview.setText("");
                        }
                        if (this.getInputElement().getValue() === "x = \\dfrac{-b \\pm \\sqrt{b^2-4ac}}{2a}") {
							var that = document.getElementById(this.getInputElement().$.id);
							that.focus();
							that.select();
						}
                    },
                    commit:function(widget){
                        widget.setData('formula', this.getValue().trim());
                    }
                },
				{
					id: 'documentation',
					type: 'html',
					html: '<div style="width:100%;text-align:right;margin:-8px 0 10px">' +
						'<a class="cke_mathjax_doc" href="' + lang.docUrl + '" target="_blank" style="cursor:pointer;color:#00B2CE;text-decoration:underline">' +
						lang.docLabel +
						'</a>' +
						'</div>'
                },
                {
                    id:'preview',
                    type:'html',
                    html:'<div id="'+eltId+'_shdwRt"></div>',
                    onLoad: function () {
                        // use shadow to override the css reset of ckeditor
                        var host = document.getElementById(eltId+'_shdwRt');
                        var katexPreview = document.createElement('div');
                        katexPreview.setAttribute('id','katexPreview');
                        var lnk = document.createElement('link');
                        lnk.setAttribute('rel', 'stylesheet');
                        lnk.setAttribute('href', 'js/katex/katex.min.css');
                        lnk.setAttribute('type', 'text/css');
                        var style = document.createElement('style');
                        style.textContent = `
                        #katexPreview {
                            display:inline-block;
                            font-size:1.6em;
                        }
                        `;
                        //preview = document.getElementById("katexPreview");
                        shadow = host.attachShadow({mode:'open'});
                        shadow.appendChild(lnk);
                        shadow.appendChild(style);
                        shadow.appendChild(katexPreview);
                        preview = shadow.getElementById('katexPreview');
					}
                }]
            }]
    }
});