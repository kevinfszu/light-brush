import {Palette} from './palette.js';

let palette = null;
let panel = document.querySelector('#js-option-panel');
let toggle = document.querySelector('#js-toggle');

panel.addEventListener('click', function (e) {
    if (e.target && e.target.matches('li')) {
        let target = e.target;
        let option = JSON.parse(target.dataset.value);

        // 切换配置
        if (palette) {
            palette.options = option;
            palette.init();
        } else {
            palette = new Palette(option).init();
        }

        // 标注当前所选的选项
        let siblings = Array.prototype.filter.call(target.parentNode.children, function(child){
            return child !== target;
        });
        siblings.forEach(element => {
            element.classList.remove('active');
        });
        target.classList.add('active');
    } else {
        toggle.click();
    }
});

let first_li = panel.querySelector('li:first-child');
first_li.click();

// 切换选项面板
toggle.addEventListener('click', function () {
    panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
});
