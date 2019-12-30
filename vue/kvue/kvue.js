class KVue {
	constructor(options) {
		this.$options = options;

		this.$data = options.data;
		// 响应化
		this.observe(this.$data)

		new Compile(options.el,this)
		if(options.created){
			options.created.call(this)
		}
	}

	observe(value) {
		if (!value || typeof value !== 'object'){
			return
		}

		// 遍历对象
		Object.keys(value).forEach(key => {
			this.defineReactive(value,key,value[key])
			this.proxyData(key)
		})
	}
	proxyData(key){
		Object.defineProperty(this,key,{
			get(){
				return this.$data[key]
			},
			set(newVal){
				this.$data[key] = newVal
			}
		})
	}
	defineReactive(obj, key, val){
		const dep = new Dep()
		Object.defineProperty(obj,key,{
			get(){
				Dep.target && dep.addDep(Dep.target)
				return val
			},
			set(newVal){

				if(newVal !== val) {
					console.log(newVal+'----'+val)
					val = newVal
					dep.notify()
				}
			}
		})
		this.observe(val)
	}
}

class Dep{
	constructor(){
		this.deps = []
	}

	addDep(dep){
		this.deps.push(dep)
	}

	notify(){
		this.deps.forEach(dep => dep.update())
	}
}

class Watcher {
	constructor(vm,key,cb){
		this.vm = vm
		this.key = key
		this.cb = cb

		Dep.target = this
		console.log(this)
		this.vm[this.key]
		Dep.target = null
	}
	update(){
		// console.log('属性更新了')
		this.cb.call(this.vm, this.vm[this.key])
	}
}