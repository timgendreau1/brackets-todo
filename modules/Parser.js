define(function () {
  'use strict';

  /**
   * Go through text and search for matches.
   */
  function parse (text, expression, file) {
    var matches;
    var todos = [];

    // Go through each match in current document.
    while ((matches = expression.exec(text)) !== null) {
      // Construct basic object.
      var todo = {
        tag: matches[1],
        comment: matches[2],
        line: text.substr(0, matches.index).split('\n').length,
        char: matches.index - text.lastIndexOf('\n', matches.index) - 1
      };

      // Assign key based on file name as well as line and column numbers.
      todo.key = file + ':' + todo.line + ':' + todo.char;

      // Add match to array.
      todos.push(todo);
    }

    // Return found comments.
    return todos;
  }

  // Make variables accessible.
  return {
    parse: parse
  };
});
