class Button {

    constructor (id, classes, value) {

        this.id = id
        this.classes = classes
        this.value = value
    }

    render (block) {

        const buttonHTML = `
            <div id='${this.id}' class="${this.classes}">
                 ${this.value} 
            </div>
        `
        block.insertAdjacentHTML('beforeend', buttonHTML)
    }
}