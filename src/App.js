import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import "./App.css";

const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        // initialDoc: "http://www.africau.edu/images/default/sample.pdf",
        initialDoc: "/files/construction-drawing-final.pdf",
        showLocalFilePicker: true,
        fullAPI: true,
        enableMeasurement: true
        // ui: 'legacy'
      },
      viewer.current
    ).then((instance) => {
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();

      let annotArrayData = [
        {
          annotation_type:"Free Text",
          StrokeThickness:1,
          X:200,
          Y:350,
          Width:200,
          Height:50,
          PageNumber: 2
        },
        {
          annotation_type: "Ellipse",
          StrokeThickness:1,
          X:400,
          Y:450,
          Width:200,
          Height:200,
          PageNumber: 1
        }
     ]

      const renderAnnotation = (type) => {
        switch(type){
          case 'Free Text':
              return new Annotations.RectangleAnnotation();

          case 'Ellipse':
              return new Annotations.EllipseAnnotation();

          default:   
        }
      }

      // creating annotation starts
      docViewer.on("documentLoaded", () => {

        const annotateAray = []

        annotArrayData.forEach((annotation) =>{
          const annotateData = renderAnnotation(annotation.annotation_type);
  
          annotateData.X = annotation.X;
          annotateData.Y = annotation.Y;
          annotateData.Width = annotation.Width;
          annotateData.Height = annotation.Height;
          annotateData.PageNumber = annotation.PageNumber
          annotateData.Author = annotManager.getCurrentUser();
          annotateData.StrokeThickness = annotation.StrokeThickness;

          annotateAray.push(annotateData)
        })

        // const rectangleAnnot = new Annotations.RectangleAnnotation();
        // rectangleAnnot.PageNumber = 1;
        // rectangleAnnot.X = 200;
        // rectangleAnnot.Y = 350;
        // rectangleAnnot.Width = 200;
        // rectangleAnnot.Height = 50;
        // rectangleAnnot.Author = annotManager.getCurrentUser();

        // const rectangleAnnot1 = new Annotations.RectangleAnnotation();
        // rectangleAnnot1.PageNumber = 1;
        // rectangleAnnot1.X = 200;
        // rectangleAnnot1.Y = 450;
        // rectangleAnnot1.Width = 200;
        // rectangleAnnot1.Height = 50;
        // rectangleAnnot1.Author = annotManager.getCurrentUser();


        annotManager.addAnnotations(annotateAray);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotManager.redrawAnnotation();
      });
      // creating annotation ends
      

      // custom pop-up: https://www.pdftron.com/documentation/web/guides/customizing-popup/
      instance.annotationPopup.add({
        type: "actionButton",
        label: "new-label",
        onClick: () => console.log("clicked"),
      });

      docViewer.setDocumentXFDFRetriever(async () => {
        // load the annotation data
        // const response = await fetch('path/to/annotation/server');
        const xfdfString = `<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><pdf-info xmlns="http://www.pdftron.com/pdfinfo" version="2" import-version="3" /><fields><field name="ACombo"><value>Red</value></field></fields><annots><square page="0" rect="197.1500000000002,402.21000000000004,469,606.87" color="#B54800" flags="print" name="ca151075-ce50-2067-c5d2-1a4364e778fc" title="Guest" subject="Rectangle" date="D:20210502205724+05'30'" interior-color="#92E8E8" creationdate="D:20210502204355+05'30'"/><square subject="Rectangle" page="0" rect="306.01,744.85,408.98,775.94" flags="print" name="447c49b7-5e50-4b13-adc8-c291102466e6" title="Guest" date="D:20171226120150-08'00'" color="#000000" width="5" creationdate="D:20171226120147-08'00'">
        <popup flags="print,nozoom,norotate" page="0" rect="0,767,112.5,842" open="no"/>
      </square><circle page="0" rect="44.980000000000004,170,127.49999999999999,237.63" color="#E44234" flags="print" name="f2c13429-8d7b-26ee-6dd3-8b1a46855ab0" title="Guest" subject="Ellipse" date="D:20210502205539+05'30'" interior-color="#FFE6A2" width="2.4490543014032946" creationdate="D:20210502204504+05'30'"><trn-custom-data bytes="{&quot;trn-annot-maintain-aspect-ratio&quot;:false}"/></circle><ink page="0" rect="295.26851128737036,611.1985112873704,403.72148871262965,642.9314887126296" color="#80E5B1" flags="print" name="2f0535b4-17b6-68ca-1406-f27c53d526c0" title="Guest" subject="Free Hand" date="D:20210502205557+05'30'" width="14.041488712629652" creationdate="D:20210502205548+05'30'"><inklist><gesture>309.31,625.24;310.53,625.24;311.75,625.24;312.97,625.24;314.18,625.24;314.18,625.24;315.4,625.24;317.84,625.24;319.05,625.24;319.05,625.24;320.27,625.24;322.71,625.24;323.93,625.24;325.14,625.24;326.36,625.24;327.58,625.24;328.8,625.24;328.8,625.24;330.01,625.24;331.23,625.24;332.45,625.24;333.67,625.24;333.67,626.46;333.67,626.46;334.89,626.46;336.1,626.46;337.32,626.46;338.54,626.46;338.54,626.46;339.76,626.46;340.97,626.46;342.19,626.46;343.41,626.46;343.41,626.46;344.63,626.46;345.85,626.46;347.06,626.46;348.28,626.46;348.28,626.46;349.5,626.46;350.72,626.46;351.93,626.46;353.15,626.46;353.15,626.46;354.37,626.46;355.59,626.46;356.81,626.46;358.02,626.46;358.02,626.46;359.24,626.46;360.46,626.46;361.68,626.46;362.89,626.46;362.89,626.46;364.11,626.46;365.33,626.46;366.55,626.46;367.77,626.46;367.77,626.46;368.98,626.46;370.2,626.46;371.42,626.46;372.64,626.46;372.64,626.46;373.85,626.46;375.07,626.46;376.29,626.46;377.51,626.46;377.51,626.46;378.72,626.46;379.94,626.46;381.16,626.46;382.38,626.46;382.38,626.46;383.6,626.46;384.81,626.46;386.03,626.46;387.25,626.46;387.25,627.67;387.25,627.67;388.47,627.67;389.68,627.67;388.47,627.67;388.47,628.89</gesture></inklist></ink><ink page="0" rect="374.771134838316,626.151134838316,380.2488651616839,631.628865161684" color="#FF8D00" flags="print" name="2bc4b6cd-fffd-f997-381f-44a02fd1a00a" title="Guest" subject="Free Hand" date="D:20210502205554+05'30'" width="2.7388651616839534" creationdate="D:20210502205552+05'30'"><inklist><gesture>377.51,628.89</gesture></inklist></ink></annots><pages><defmtx matrix="1,0,0,-1,0,842" /></pages></xfdf>`;

        // console.log("xfdfString", xfdfString);
        return xfdfString;
      });


      // custom permission can be done here
      annotManager.setPermissionCheckCallback((author, annotation) => {
        // the default permission check that is used
        // you can combine this with your own custom checks
        const defaultPermission =
          annotation.Author === annotManager.getCurrentUser();
        // any annotation with 50% opacity will also be editable regardless of the author
        const customPermission = annotation.Opacity === 0.5;

        return defaultPermission || customPermission;
      });

      
      instance.setHeaderItems((header) => {
        header.push({
          type: "actionButton",
          img:
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/pdf-extension-509633.png",
          onClick: async () => {
            console.log("fetch PDF data here");
            const doc = docViewer.getDocument();
            const xfdfString = await annotManager.exportAnnotations();
            const data = await doc.getFileData({
              // saves the document with annotations in it
              xfdfString,
            });
            console.log(xfdfString);
            const arr = new Uint8Array(data);
            const blob = new Blob([arr], { type: "application/pdf" });
            console.log("blob", blob);

            // add code for handling Blob here
          },
        });
      });

      instance.setHeaderItems((header) => {
        header.push({
          type: "actionButton",
          img:
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/pdf-extension-509633.png",
          onClick: async () => {
            const doc = docViewer.getDocument();
            const xfdfString = await annotManager.exportAnnotations();
            const data = await doc.getFileData({
              // saves the document with annotations in it
              xfdfString,
            });
            const arr = new Uint8Array(data);
            const blob = new Blob([arr], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            window.open(url);
          },
        });
      });

      // ************ export annotate data ************


      // ************ import annotate data ************
      // annotManager.importAnnotations(docViewer.setDocumentXFDFRetriever());
      


      // ************ annotation events starts: *************************


      // annotation selected
      annotManager.on("annotationSelected", (annotations, action) => {
        if (action === "selected") {
          console.log("annotation selection");
          console.log("annotation list", annotations);
        } else if (action === "deselected") {
          console.log("annotation deselection");
        }

        if (annotations === null && action === "deselected") {
          console.log("all annotations deselected");
        }
      });


      // annotation add/modify
      // annotManager.on('annotationChanged', (annotations, action) => {
      //   if (action === 'add') {
      //     console.log('this is a change that added annotations');
      //   } else if (action === 'modify') {
      //     console.log('this change modified annotations');
      //   } else if (action === 'delete') {
      //     console.log('there were annotations deleted');
      //   }

      //   annotations.forEach((annot) => {
      //     console.log(  annot);
      //   });
      // });

      // ************ annotation events ends: ************************



      // docViewer.on('annotationsLoaded', () => {
      //   // all annotations are available
      //   const annotations = annotManager.getAnnotationsList();
      //   console.log("annotations", annotations)
      // });
    });
  }, []);

  return (
    <div className="App">
      <div className="header">Pdftron Sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
