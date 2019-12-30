class Compile {
	constructor(el, vm){
		this.$vm = vm
		this.$el = document.querySelector(el)

		if(this.$el) {
			this.$fragment = this.node2Fragment(this.$el)
			this.compile(this.$fragment)
			this.$el.appendChild(this.$fragment)
		}
	}
	node2Fragment(el){
		const fragment = document.createDocumentFragment()
		let child;
		while(child = el.firstChild){
			fragment.appendChild(child)
		}
		return fragment
	}
	compile(el){
		const childNodes = el.childNodes

		Array.from(childNodes).forEach(node =>{
			if(node.nodeType === 1){
				// element节点
				// console.log('编译元素节点'+node.nodeName)
				this.compileElement(node)
			} else if(this.isInterpolation(node)) {
				// console.log('编译插值文本'+node.textContent)
				this.compileText(node)
			}

			if(node.childNodes && node.childNodes.length > 0) {
				this.compile(node)
			}
		})
	}

	isInterpolation(node){
		// 是文本且符合{{}}
		return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
	}

	compileElement(node){
		let nodeAttrs = node.attributes
		Array.from(nodeAttrs).forEach(attr => {
			const attrName = attr.name
			const exp = attr.value
			if(this.isDirective(attrName)){
				const dir = attrName.substring(2)
				this[dir] && this[dir](node, this.$vm, exp)
			}
			if(this.isEvent(attrName)){
				const dir = attrName.substring(1)
				this.eventHandler(node, this.$vm, exp, dir)
			}
		})
	}
	isDirective(attr){
		return attr.indexOf('k-') === 0
	}
	isEvent(attr){
		return attr.indexOf('@') === 0
	}
	compileText(node){
		this.update(node,this.$vm,RegExp.$1,'text')
	}

	update(node, vm, exp, dir){
		let updatrFn = this[dir+'Updator']
		updatrFn && updatrFn(node,vm[exp])
		new Watcher(vm,exp,function(value){
			updatrFn && updatrFn(node,value)
		})
	}
	text(node, vm, exp){
		this.update(node, vm ,exp, 'text')
	}
	textUpdator(node, val){
		node.textContent = val
	}
	eventHandler(node,vm,exp,dir){
		const fn = vm.$options.methods && vm.$options.methods[exp]
		if(dir && fn){
			node.addEventListener(dir, fn.bind(vm))
		}
	}

	html(node, vm, exp){
		this.update(node,vm,exp,'html')
	}
	model(node,vm,exp){
		this.update(node,vm,exp,'model')
		node.addEventListener('input',e=>{
			vm[exp]= e.target.value
		})
	}
	htmlUpdater(node,value){
		node.innerHTML = value
	}
	modelUpdater(node,value){
		node.value = value
	}
}