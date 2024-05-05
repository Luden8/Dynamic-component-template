import { compile, ref,toValue, onUnmounted, watchEffect } from 'vue'
export default function useDynamicTemplate({ template = [], styles = [] }) {
    let compiledTemplate = ref('')

    const styleElement = document.createElement('style');

    const generateStyles = (cssString) => {
        styleElement.type = 'text/css';
        styleElement.textContent = cssString;
        document.head.appendChild(styleElement);
    }

    watchEffect(() => {
        const targetTemplate = template[0].value || template[1]
        compiledTemplate.value = compile(targetTemplate)
    })

    watchEffect(() => {
        const targetStyles = styles[0].value || styles[1]
        generateStyles(toValue(targetStyles))
    })


    onUnmounted(() => {
        document.head.removeChild(styleElement);
    });


    return {
        compiledTemplate
    }
}