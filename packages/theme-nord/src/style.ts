/* Copyright 2021, Milkdown by Mirone. */

import {
    Color,
    Emotion,
    ThemeBorder,
    ThemeColor,
    ThemeFont,
    ThemeManager,
    ThemeScrollbar,
    ThemeShadow,
    ThemeSize,
} from '@milkdown/core';

export const getStyle = (manager: ThemeManager, { injectGlobal, css }: Emotion) => {
    const palette = (color: Color, opacity = 1) => manager.get(ThemeColor, [color, opacity]);
    const radius = manager.get(ThemeSize, 'radius');
    const neutral = palette('neutral', 0.87);
    const surface = palette('surface');
    const line = palette('line');
    const highlight = palette('secondary', 0.38);

    const selection = css`
        .ProseMirror-selectednode {
            outline: ${manager.get(ThemeSize, 'lineWidth')} solid ${line};
        }

        li.ProseMirror-selectednode {
            outline: none;
        }

        li.ProseMirror-selectednode::after {
            ${manager.get(ThemeBorder, undefined)};
        }

        & ::selection {
            background: ${highlight};
        }
    `;

    const editorLayout = css`
        padding: 3.125em 1.25em;
        outline: none;
        & > * {
            margin: 1.875em 0;
        }

        @media only screen and (min-width: 72rem) {
            max-width: 57.375em;
            padding: 3.125em 7.25em;
        }
    `;

    const paragraph = css`
        p {
            font-size: 1em;
            line-height: 1.5;
            letter-spacing: 0.5px;
        }
    `;

    const blockquote = css`
        blockquote {
            padding-left: 1.875em;
            line-height: 1.75em;
            border-left: 4px solid ${palette('primary')};
            margin-left: 0;
            margin-right: 0;
            * {
                font-size: 1em;
                line-height: 1.5em;
            }
        }
    `;

    const heading = css`
        h1 {
            font-size: 3em;
            line-height: 1.167;
        }
        h2 {
            font-size: 2.5em;
            line-height: 1.2;
        }
        h3 {
            font-size: 2.125em;
            line-height: 1.05;
        }
        h4 {
            font-size: 1.75em;
            line-height: 1.14;
        }
        h5 {
            font-size: 1.5em;
            line-height: 1;
        }
        h6 {
            font-size: 1.25em;
            line-height: 1;
        }
        .heading {
            margin: 40px 0;
            font-weight: 400;
        }
    `;

    const hr = css`
        hr {
            height: ${manager.get(ThemeSize, 'lineWidth')};
            background-color: ${line};
            border-width: 0;
        }
    `;

    const list = css`
        .list-item,
        .list-item > * {
            margin: 0.5em 0;
        }

        li {
            &::marker {
                color: ${palette('primary')};
            }
        }

        .task-list-item {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            &_checkbox {
                margin: 0.5em 0.5em 0.5em 0;
                height: 1em;
            }
        }
    `;

    const code = css`
        .code-fence {
            pre {
                font-family: ${manager.get(ThemeFont, 'code')};
                margin: 0 1.2em !important;
                white-space: pre;
                overflow: auto;
                ${manager.get(ThemeScrollbar, 'x')}

                background-color: ${palette('background')};
                color: ${palette('neutral')};
                font-size: 0.875em;
                border-radius: ${radius};

                code {
                    line-height: 1.5;
                    font-family: ${manager.get(ThemeFont, 'code')};
                }
            }
        }
    `;

    const img = css`
        .image {
            display: inline-block;
            margin: 0 auto;
            object-fit: contain;
            width: 100%;
            position: relative;
            height: auto;
            text-align: center;
        }
    `;

    const inline = css`
        .code-inline {
            background-color: ${palette('neutral')};
            color: ${palette('background')};
            border-radius: ${radius};
            font-weight: 500;
            font-family: ${code};
            padding: 0 0.2em;
            font-size: 1.2em;
        }

        .strong {
            font-weight: 600;
        }

        .link {
            color: ${palette('secondary')};
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            font-weight: 500;
            &:hover {
                background-color: ${palette('line')};
                box-shadow: 0 0.2em ${palette('line')}, 0 -0.2em ${palette('line')};
            }
        }

        .strike-through {
            text-decoration-color: ${palette('secondary')};
        }
    `;

    const table = css`
        /* copy from https://github.com/ProseMirror/prosemirror-tables/blob/master/style/tables.css */
        .tableWrapper {
            overflow-x: auto;
            margin: 0;
            ${manager.get(ThemeScrollbar, 'x')}
            width: 100%;
            * {
                margin: 0;
                box-sizing: border-box;
                font-size: 1em;
            }
        }
        table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
            overflow: auto;
            border-radius: ${manager.get(ThemeSize, 'radius')};
            p {
                line-height: unset;
            }
        }
        tr {
            ${manager.get(ThemeBorder, 'bottom')};
        }
        td,
        th {
            padding: 0 1em;
            vertical-align: top;
            box-sizing: border-box;
            position: relative;

            min-width: 100px;
            ${manager.get(ThemeBorder, undefined)};
            text-align: left;
            line-height: 3;
            height: 3em;
        }
        th {
            background: ${palette('background', 0.5)};
            font-weight: 400;
        }
        .column-resize-handle {
            position: absolute;
            right: -2px;
            top: 0;
            bottom: 0;
            z-index: 20;
            pointer-events: none;
            background: ${palette('secondary')};
            width: ${manager.get(ThemeSize, 'lineWidth')};
        }
        .resize-cursor {
            cursor: ew-resize;
            cursor: col-resize;
        }

        .selectedCell {
            &::after {
                z-index: 2;
                position: absolute;
                content: '';
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: ${palette('secondary', 0.38)};
                pointer-events: none;
            }

            & ::selection {
                background: transparent;
            }
        }
    `;

    injectGlobal`
        .milkdown {
            .material-icons-outlined {
                font-size: 1.5em;
            }

            position: relative;
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;


            color: ${neutral};
            background: ${surface};
            font-family: ${manager.get(ThemeFont, 'typography')};

            ${manager.get(ThemeShadow, undefined)}
            ${manager.get(ThemeScrollbar, undefined)}
            ${selection};

            .editor {
                user-modify: read-write-plaintext-only;
                
                ${editorLayout};

                ${paragraph};
                ${heading};
                ${blockquote};
                ${hr};
                ${list};
                ${code};
                ${img};

                ${table};

                ${inline};
            }
        }
    `;
};
