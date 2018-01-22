
rangy.init();

var HighlighterButton = MediumEditor.extensions.button.extend({
  name: 'highlighter',

  tagNames: ['mark'], // nodeName which indicates the button should be 'active' when isAlreadyApplied() is called
  contentDefault: '<b>H</b>', // default innerHTML of the button
  contentFA: '<i class="fa fa-paint-brush"></i>', // innerHTML of button when 'fontawesome' is being used
  aria: 'Highlight', // used as both aria-label and title attributes
  action: 'highlight', // used as the data-action attribute of the button

  init: function () {
    MediumEditor.extensions.button.prototype.init.call(this);

    this.classApplier = rangy.createClassApplier('highlight', {
      elementTagName: 'mark',
      normalize: true
    });
  },

  handleClick: function (event) {
    this.classApplier.toggleSelection();
    this.base.checkContentChanged();
    this.handleOpen().bind(this);
    // var native = rangy.getNativeSelection()
    // console.log(native)
  }
});


var editor = new MediumEditor('#content', {
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'highlighter']
    },
    buttonLabels: 'fontawesome',
    extensions: {
        'highlighter': new HighlighterButton()
    }
});