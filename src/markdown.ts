import { Transformer } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

type TextNode = {
  value: string;
  type: string;
  data: any;
}

export const remarkLatexEnvironment: () => Transformer = () => {
  const transformer: Transformer = (tree: Node) => {
    try {
      visit(tree, 'paragraph', (node) => {
        visit(node, 'text', (textNode: TextNode) => {
          if (
            textNode.value.match(RegExp('^\\s*\\\\begin\{[a-z]+\}', 'm')) &&
            textNode.value.match(RegExp('\\\\end\{[a-z]+\}\\s*$', 'm'))
          ) {
            textNode.type = 'math';
            textNode.value = textNode.value.replace(/\\\s*$/gm, "\\\\\\");
            textNode.data = {
              hChildren: [{type: 'text', value: textNode.value}],
              hName: "div",
              hProperties: {
                className: ['math', 'math-inline'],
              }
            }
          }
        });
      })
    } finally {
      return tree;
    }
  };
  return transformer;
};