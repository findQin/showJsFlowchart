
const showJsFlowchart = (checkedList) => {
  const {
    ABSTRACTION_LEVELS,
    createFlowTreeBuilder,
    convertFlowTreeToSvg,
    convertCodeToSvg
  } = window.js2flowchart;
  
  const flowTreeBuilder = createFlowTreeBuilder();
  
  //you can pass one level or multiple levels in [] as well
  const levels = [
    ABSTRACTION_LEVELS.FUNCTION,
    ABSTRACTION_LEVELS.FUNCTION_DEPENDENCIES,
    ABSTRACTION_LEVELS.CLASS,
    ABSTRACTION_LEVELS.IMPORT,
    ABSTRACTION_LEVELS.EXPORT
  ].filter((item, index) => {
    return checkedList[index];
  });
  flowTreeBuilder.setAbstractionLevel(levels);
  
  const flowTree = flowTreeBuilder.build(code),
    svg = convertFlowTreeToSvg(flowTree);
  
  document.getElementById('svgImage').innerHTML = svg;
}

let inputFile = document.getElementById('input-file');
inputFile.addEventListener('change', function() {
  var reader = new FileReader();
  reader.readAsText(inputFile.files[0]);
  reader.onload = function() {
    code = this.result;
    const {convertCodeToSvg} = window.js2flowchart;
    document.getElementById('svgImage').innerHTML = convertCodeToSvg(code);
  }
});


let formLevel = document.getElementById('form-level');
formLevel.onsubmit = function(e) {
  e.preventDefault();
  const formObj = e.target;
  const checkedList = ['box-func', 'box-funcdep', 'box-class', 'box-import', 'box-export'].map(item => {
    return formObj[item].checked;
  });
  showJsFlowchart(checkedList);
}