#Annotated example code

	/**
	 * @namespace pulsar
	 */
	/**
	 * @namespace pulsar.events
	 */
	module pulsar.events
	{


		/**
		 * Interface Description Title.
		 * @interface
		 * @class pulsar.events.IEvent
		 * @classdesc Interface Description
		 */
		export interface IEvent
		{
			/**
			 * Member description
			 * @abstract
			 * @member {pulsar.events.Event} pulsar.events.IEvent#name
			 */
			name:string;

			/**
			 * Method desc
			 * @abstract
			 * @method pulsar.events.IEvent#call
			 * @param {string} name Description
			 * @param {number} index Description
			 */
			call( name:string , index:number):void;

		}

		/**
		 * Callback Interface Title
		 * @interface
		 * @class pulsar.events.IListenerCallback
		 * @classdesc Interface Description
		 */
		export interface IListenerCallback
		{
			/**
			 * Method desc
			 * @abstract
			 * @method pulsar.events.IListenerCallback#listener
			 * @param {pulsar.events.Event} event Param Description
			 * @returns {void}
			 */

			(event: pulsar.events.Event): void;
		}




		export class Event
		{

			/**
			 * Event Description
			 * @event pulsar.events.Event.events:ACTIVATE
			 */
			public static ACTIVATE:string = "ACTIVATE";

			/**
			 * Class Description Title
			 * @implements pulsar.events.IEvent
			 * @class pulsar.events.Event
			 * @classdesc Class Description
			 * @param {string} type Param Description
			 * @param {any} data Param Description
			 */
			constructor(private type:string, private data?:any ){
			}

			/**
			 * Method Description
			 * @method pulsar.events.Event#type
			 * @returns {string}
			 */
			public getType():string{ return this.type }

			/**
			 * Method Description
			 * @method pulsar.events.Event#data
			 * @returns {*=}
			 */
			public getData():any{ return this.data }

			/**
			 * Method Description
			 * @static
			 * @method pulsar.events.Event.metodo
			 */
			public static staticMethod(){}

		}

		export class ExtendedEvent extends Event
		{
			/**
			 * Class Description Title
			 * @class pulsar.events.ExtendedEvent
			 * @extends pulsar.events.Event
			 * @classdesc Class Description
			 */
			constructor(){
				super("");
			}
		}
		export interface IEventListener
		{
			/**
			 * Member description
			 * @abstract
			 * @member {string} pulsar.events.IEventListener#type
			 */
			type:string;

			/**
			 * Member description
			 * @abstract
			 * @member {pulsar.events.IListenerCallback} pulsar.events.IEventListener#listener
			 */
			listener:IListenerCallback;
		}


		/**
		 * Class Description
		 */
		export class EventDispatcher
		{
			private listeners:IEventListener[] =[];
			/**
			 * Class Description Title
			 * @class pulsar.events.EventDispatcher
			 * @extends pulsar.events.Event
			 * @classdesc Class Description
			 */
			constructor(){}


			/**
			 * Method Description
			 * @method pulsar.events.EventDispatcher#hasEventListener
			 * @param {string} type Param Description
			 * @param {pulsar.events.IListenerCallback} listener Param Description
			 * @returns {boolean}
			 */
			public hasEventListener(type:string, listener:pulsar.events.IListenerCallback):boolean
			{
				for (var i:number = 0, total:number = this.listeners.length; i < total; i++)
				{
					if (this.listeners[i].type === type && this.listeners[i].listener === listener)
					{
						return true;
					}
				}

				return false;
			}

			/**
			 * Method Description
			 * @method pulsar.events.EventDispatcher#addEventListener
			 * @param {string} type Param Description
			 * @param {pulsar.events.IListenerCallback} listener Param Description
			 */
			public addEventListener (type:string, listener:pulsar.events.IListenerCallback):void
			{
				if (this.hasEventListener(type, listener)) { return; }

				this.listeners.push({type: type, listener: listener});
			}


			/**
			 * Method Description
			 * @method pulsar.events.EventDispatcher#removeEventListener
			 * @param {string} type Param Description
			 * @param {pulsar.events.IListenerCallback} listener Param Description
			 */
			public removeEventListener (type:string, listener:pulsar.events.IListenerCallback):void
			{
				for (var i:number = 0, total:number = this.listeners.length; i < total; i++)
				{
					if (this.listeners[i].type === type && this.listeners[i].listener === listener)
					{
						this.listeners.splice(i, 1);
						break;
					}
				}
			}

			/**
			 * Method Description
			 * @method pulsar.events.EventDispatcher#dispatchEvent
			 * @param {pulsar.events.Event} evt Param Description
			 */
			public dispatchEvent (evt:pulsar.events.Event):void
			{
				for (var i:number = 0, total:number = this.listeners.length; i < total; i++)
				{
					if (this.listeners[i].type === evt.getType())
					{
						this.listeners[i].listener.call(this, evt);
					}
				}
			}
		}
	}