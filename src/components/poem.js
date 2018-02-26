import React, { Component } from 'react';
import _ from 'lodash';

import rangy from 'rangy/lib/rangy-core';
import 'rangy/lib/rangy-serializer';
// import highlighter from '../../node_modules/rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-selectionsaverestore';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-textrange';
// import MediumButton from 'medium-button';
import MediumEditor from 'medium-editor';




// next steps:
// make comment log based on clicking on item  DONE
// rangy save selction restore selction shuold work but need to store selection remotely to try and load it
// prevent additional additions to state on click. 
// ability to cancel highlight and link 
// ensure link locations and data and ids can load on selection import
// figure out saveselection and restoreSelection

class Poem extends Component {

    constructor(props) {
        super(props)

        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.saveAnnotation = this.saveAnnotation.bind(this);
        this.restoreAnn = this.restoreAnn.bind(this)
        this.high = this.high.bind(this);
        
        
        const selectionData = [];

        let data = {test:'a'}
    }

    

    state = {
        selections: [],
        id: ''
    };



    componentDidMount() {


        // dummy data selections

        // const selects =    {start: 447, end: 460};

        rangy.init();
        // rangy.restoreSelectionFromCookie()

        // var local = JSON.parse(localStorage.getItem('myData'));
        // console.log(local)
        // rangy.deserializeSelection(local);
        

        // var data = localStorage.getItem('myData')
        // const idx = this.state.id;
        // console.log(idx)

        // console.log(selects.length);




            // selects.map((item) => {
            //     this.base.importSelection(item)
            //     this.classApplier.toggleSelection();
            // })



        this.high();

          // how to import multiple selects
         
        

    } 

   

    // componentDidUpdate(prevProps, prevState){
    //     console.log('updatecalled')
    //     console.log()

    //     if(prevState.selections.pop()){
    //         console.log('idFound')
    //         console.log()
    //     }

    //     // const iddx = this.state.id;
    //     // console.log('iddx: ' , iddx)
    //     // this.high(iddx);
    // }




        high() {

           

        var HighlighterButton = MediumEditor.extensions.button.extend({
            name: 'highlighter',

            tagNames: ['a'], // nodeName which indicates the button should be 'active' when isAlreadyApplied() is called
            contentDefault: '<b>H</b>', // default innerHTML of the button
            contentFA: '<i class="fa fa-paint-brush"></i>', // innerHTML of button when 'fontawesome' is being used
            aria: 'Highlight', // used as both aria-label and title attributes
            action: 'highlight', // used as the data-action attribute of the button

            init: function () {
                MediumEditor.extensions.button.prototype.init.call(this);

                console.log(this.state)
                // if(this.state.selections.length > 1){
                //     const tempID = this.state.selections.pop()
                //     console.log(tempID)
                // }

                var id = 0;

                this.classApplier = rangy.createClassApplier('highlight', {
                    elementTagName: 'a',
                    elementProperties: {
                        // id: idx,
                        href: '#',
                        onclick: function () {
                            // this.makeHighlight()
                            handleOpen();
                            console.log('link clicked and called')
                            console.log(this.id)
                            // const see = highlight.getHighlightForElement(this)
                            searchSelection(this.id)
                            return false;
                        }
                    },
                    // this adds unique ID to selection with callback function
                    onElementCreate: function(el) {
                        el.id = "rangySpan_" + (id++);
                        // console.log(el.id)
                        updateID(el.id)
                        },
                    normalize: true
                });

              

            },

            handleClick: function (event) {
                // this.base.importSelection({start: 447, end: 460})
                
                this.classApplier.toggleSelection();
                this.base.checkContentChanged();

                // // location of selection
                var range = this.base.exportSelection();
                // console.log(save)

                // var sel = this.base.saveSelection()
                var native = rangy.getNativeSelection()

                // text of selection
                var quote = native.baseNode.data

                // text of URL
                var url = native.baseNode.baseURI

                
                // this.base.saveSelection();

                // console.log(this.base)

                // var asd = this.base.saveSelection();
                // console.log(this.base.saveSelection().bind(this))

                
                // var save = this.base.saveSelection();


                // console.log(save)

                // var id = idx
                // console.log(id)

                // handleOpen(range, quote, url);
                handleOpen(range, quote, url);
                // console.log(range, quote, url)

            }
        });

    

        var editor = new MediumEditor('#content', {
            
        
            
            toolbar: {
                // buttons: ['bold', 'italic', 'underline', 'highlighter', 'autolink']
                buttons: ['highlighter']
            },
            buttonLabels: 'fontawesome',
            extensions: {
                'highlighter': new HighlighterButton()
            }
        });

        // passthrough function to get vars out of this scope
        const handleOpen = (range, quote, url, id) => {
            // console.log(range, quote, url)
            this.openNav(range, quote, url, id)
            // editor.importSelection({start: 447, end: 460})
            // toggleSelection();
            

// console.log(


            // editor.subscribe('editableDrop', function () {
            //     var test = editor.saveSelection();
            //     console.log('test: ' , test)
            // })

            // medium.subscribe('editableInput', medium.saveSelection.bind(medium))
            // editor.subscribe
            // var save = editor.saveSelection().bind(editor);
            // console.log(save)
            // console.log(editor)

           
        }

        // this function finds selection content of item clicked on <a tag>
        const searchSelection = (id) => {
            return this.state.selections.map((item) => {
               if(item.id === id){
                   console.log(item)
                    return item
                }
            })
        }

        // this function sets state id to id of last selection
        const updateID = (idx) => {
          
            this.setState( (prevState ) => {
                return {          
                    id: idx
                }
            }, function (){
                // console.log('id: ', this.state)
            })

           
        }

    }


    //End ComponentDidMount

    // function handleOpen(){
    //     console.log('test')
    //     this.openNav()
    // }

    // Toggles nav
    toggleNav() {
        // editor.restoreSelection();

        // if(open)
        if (document.getElementById("mySidenav").style.width === "250px") {
            // close
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("content").style.marginLeft = "200px";
        } else {
            // open
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("content").style.marginLeft = "250px";
        }
    }


    openNav(range, quote, url, id) {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("content").style.marginLeft = "250px";

        // console.log(range, quote, url)

        // updates state values for this selection
        const data = {
            range: range,
            quote: quote,
            url: url,
            id: id
        }

        this.setState( (prevState ) => {
            return {
                selections: [...prevState.selections, data]
            }
        })

        // console.log(data)
        // console.log(this.state)

    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("content").style.marginLeft = "200px";
    }

    restoreAnn(sel){
        rangy.restoreSelection(sel);
        
    }


    // gets text from input and adds it to the currect selection state obj
    saveAnnotation() {
        const textarea = document.getElementById("text");
        var savedSel = rangy.saveSelection(document.getElementById("content"));
        console.log('saved selection: ', savedSel)

        // var selObj = rangy.getSelection();
        // var sel = rangy.serializeSelection(savedSel, true);

        // rangy.saveSelectionCookie();

        // var ser = rangy.serializeSelection(savedSel, true)
        // console.log('ser: ', ser)
        

        // restoreAnn(savedSel);

        // localStorage.setItem('myData', JSON.stringify(savedSel));

        // var local = JSON.parse(localStorage.getItem('myData'));
        // console.log('local: ', local)

// console.log('local: ', localStorage.getItem('myData'))

// getter
// localStorage.getItem('myData');

        // get the last item in the selections array and add comment
        const newState = this.state.selections.pop()
        console.log(newState)
        newState.comment = textarea.value;
        newState.id = this.state.id
        console.log(newState)

        this.setState( (prevState ) => {
            return {
                selections: [...prevState.selections, newState]
                
        
            }
        }, function (){
            console.log(this.state)
        })

        // after saved close nav and clear field
        this.toggleNav();
        textarea.value = ''

        
        
        // console.log(data)
       
        //   // // location of selection
        //   var range = this.base.exportSelection();
        //   // console.log(save)

        //   // var sel = this.base.saveSelection()
        //   var native = rangy.getNativeSelection()

        //   // text of selection
        //   var quote = native.baseNode.data

        //   // text of URL
        //   var url = native.baseNode.baseURI

       

       
        
        // console.log(newState)



        // console.log(this.state)

        // console.log(quote)
        // console.log(range, quote, url)

    }



    render() {

        return (

            <div>

                <button onClick={this.toggleNav}>Toggle</button>
                <button onClick={this.restoreAnn}>restore</button>
                



                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>

                    <textarea rows="10" cols="50" id="text"></textarea>
                    <br /><button onClick={this.saveAnnotation} id="save">Save</button>

                </div>


                <div id="content">

                    <h1>W. H. Auden, 1907 - 1973</h1>

                    <h3>This Marble Monument Is Erected by the State)</h3>

                    <p>He was found by the Bureau of Statistics to be
             One against whom there was no official complaint,
             And all the reports on his conduct agree</p>

                    <p>That, in the modern sense of an old-fashioned word, he was a
                saint,
             For in everything he did he served the Greater Community.
             Except for the War till the day he retired
             He worked in a factory and never got fired,
             But satisfied his employers, Fudge Motors Inc.
             Yet he wasn’t a scab or odd in his views,
             For his Union reports that he paid his dues,
             (Our report on his Union shows it was sound)
             And our Social Psychology workers found
             That he was popular with his mates and liked a drink.
             The Press are convinced that he bought a paper every day
             And that his reactions to advertisements were normal in every way.
             Policies taken out in his name prove that he was fully insured,
             And his Health-card shows he was once in hospital but left it cured.
             Both Producers Research and High-Grade Living declare
             He was fully sensible to the advantages of the Instalment Plan
             And had everything necessary to the Modern Man,
             A phonograph, a radio, a car and a frigidaire.
             Our researchers into Public Opinion are content
             That he held the proper opinions for the time of year;
             When there was peace, he was for peace:  when there was war, he went.
             He was married and added five children to the population,
             Which our Eugenist says was the right number for a parent of his
                generation.</p>

                    <p>That, in the modern sense of an old-fashioned word, he was a
                saint,
             For in everything he did he served the Greater Community.
             Except for the War till the day he retired
             He worked in a factory and never got fired,
             But satisfied his employers, Fudge Motors Inc.
             Yet he wasn’t a scab or odd in his views,
             For his Union reports that he paid his dues,
             (Our report on his Union shows it was sound)
             And our Social Psychology workers found
             That he was popular with his mates and liked a drink.
             The Press are convinced that he bought a paper every day
             And that his reactions to advertisements were normal in every way.
             Policies taken out in his name prove that he was fully insured,
             And his Health-card shows he was once in hospital but left it cured.
             Both Producers Research and High-Grade Living declare
             He was fully sensible to the advantages of the Instalment Plan
             And had everything necessary to the Modern Man,
             A phonograph, a radio, a car and a frigidaire.
             Our researchers into Public Opinion are content
             That he held the proper opinions for the time of year;
             When there was peace, he was for peace:  when there was war, he went.
             He was married and added five children to the population,
             Which our Eugenist says was the right number for a parent of his
                generation.</p>

                    <p >
                        That, in the modern sense of an old-fashioned word, he was a
                saint,
             For in everything he did he served the Greater Community.
             Except for the War till the day he retired
             He worked in a factory and never got fired,
             But satisfied his employers, Fudge Motors Inc.
             Yet he wasn’t a scab or odd in his views,
             For his Union reports that he paid his dues,
             (Our report on his Union shows it was sound)
             And our Social Psychology workers found
             That he was popular with his mates and liked a drink.
             The Press are convinced that he bought a paper every day
             And that his reactions to advertisements were normal in every way.
             Policies taken out in his name prove that he was fully insured,
             And his Health-card shows he was once in hospital but left it cured.
             Both Producers Research and High-Grade Living declare
             He was fully sensible to the advantages of the Instalment Plan
             And had everything necessary to the Modern Man,
             A phonograph, a radio, a car and a frigidaire.
             Our researchers into Public Opinion are content
             That he held the proper opinions for the time of year;
             When there was peace, he was for peace:  when there was war, he went.
             He was married and added five children to the population,
             Which our Eugenist says was the right number for a parent of his
                generation.</p>

                    <p>
                        And our teachers report that he never interfered with their
                education.
             Was he free? Was he happy? The question is absurd:
             Had anything been wrong, we should certainly have heard.
             </p>
                </div>

            </div>
        );
    }
}

export default Poem;





// template




// {
//     "id": "39fc339cf058bd22176771b3e3187329",  # unique id (added by backend)
//     "annotator_schema_version": "v1.0",        # schema version: default v1.0
//     "created": "2011-05-24T18:52:08.036814",   # created datetime in iso8601 format (added by backend)
//     "updated": "2011-05-26T12:17:05.012544",   # updated datetime in iso8601 format (added by backend)
//     "text": "A note I wrote",                  # content of annotation
//     "quote": "the text that was annotated",    # the annotated text (added by frontend)
//     "uri": "http://example.com",               # URI of annotated document (added by frontend)
//     "ranges": [                                # list of ranges covered by annotation (usually only one entry)
//       {
//         "start": "/p[69]/span/span",           # (relative) XPath to start element
//         "end": "/p[70]/span/span",             # (relative) XPath to end element
//         "startOffset": 0,                      # character offset within start element
//         "endOffset": 120                       # character offset within end element
//       }
//     ],
//     "user": "alice",                           # user id of annotation owner (can also be an object with an 'id' property)
//     "consumer": "annotateit",                  # consumer key of backend
//     "tags": [ "review", "error" ],             # list of tags (from Tags plugin)
//     "permissions": {                           # annotation permissions (from Permissions/AnnotateItPermissions plugin)
//       "read": ["group:__world__"],
//       "admin": [],
//       "update": [],
//       "delete": []
//     }
//   }










// drawer


// Overlay Drawer

//     /* Set the width of the side navigation to 250px */
// function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
// }

// /* Set the width of the side navigation to 0 */
// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
// }


// function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
//     document.getElementById("content").style.marginLeft = "250px";
// }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//     document.getElementById("content").style.marginLeft= "200px";
// }
        // Content to be annotated






// this.handleOpen();



        ///////end

        // // Start rangy when component mounts and declare varibles
        // rangy.init();
        // let serializedHighlights = '';
        // const highlight = highlighter.createHighlighter();

        // highlight.addClassApplier(classapplier.createClassApplier("highlight", {
        //     ignoreWhiteSpace: true,
        //     tagNames: ["span", "a"],
        //     elementTagName: "a",
        //     elementProperties: {
        //         href: "#",
        //         onclick: function () {
        //             // this.makeHighlight()
        //             console.log('called')
        //             // const see = highlight.getHighlightForElement(this)

        //             return false;
        //         }
        //     }
        // }));


        // // this needs to be called when it is told to save somehow
        // // then you will build object to store
        // const makeHighlight = () => {
        //     highlight.highlightSelection("highlight");
        //     serializedHighlights = highlight.serialize();
        //     // var sel = rangy.getSelection()
        // }


        //  // If selection is made and mouseup call highlight
        // document.getElementById('content').addEventListener('click', function () {

        //     rangy.getSelection().expand("word", {
        //         trim: true
        //     });
        //     highlight.highlightSelection("highlight");
        //     serializedHighlights = highlight.serialize();
        //     var native = rangy.getNativeSelection()

        //     // If selection greater than two letters then execute
        //     if (native.focusOffset > 2) {
        //         // openModal1();
        //         // modal1.show()
        //         // console.log(native)
        //         // buildHighlight(native.baseNode.baseURI, native.baseNode.data)
        //         // console.log('uri: ', native.baseNode.baseURI)
        //         // console.log('selection: ', native.baseNode.data)
        //         // console.log(serializedHighlights)
        //         // console.log(native.isCollapsed);
        //         // console.log(highlightArray)
        //     }

        // });

        // // checks if serialization is availible if so it loads it
        // // check to see if once serial is loaded if highlights are available
        // // const see = highlight.getHighlightForElement(this)
        // if (serializedHighlights) {
        //     highlighter.deserialize(serializedHighlights);
        // }