
/* core module */
import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	Renderer2,
	AfterViewInit,
} from '@angular/core';

/**
 * Define the CharCount Directive.
 */
@Directive({
	selector: '[charCount]',
})
/**
 * CharCount Class.
 */
export class CharCount implements AfterViewInit {
	// Default character limit if none is supplied.
	private _defaultLimit: number = 200;

	// The character limit input variable.
	@Input('charCount') _limit: number;

	/**
	 * Class constructor.
	 *
	 * @param { ElementRef } _elRef
	 *   An ElementRef object instance.
	 * @param { Renderer2 } _renderer2
	 *   A Renderer object instance.
	 */
	constructor(private _elRef: ElementRef, private _renderer2: Renderer2) { }

	@HostListener('keyup') onKeyUp() {
		// When the field on the host is updated. Update the count display.
		let count: any = this._elRef.nativeElement.value.length;
		this._renderer2.setValue(this._elRef.nativeElement.nextElementSibling.firstChild, String(count) + '/' + this._limit);
	}

	/**
	 * Implements the AfterViewInit lifecycle hook.
	 */
	ngAfterViewInit() {
		// If no character limit was supplied via input, then use the default limit.
		this._limit = this._limit || this._defaultLimit;

		const countElement = this._renderer2.createElement('small'); // A html nativeElement (small) to display the character count.
		const elementValue = this._renderer2.createText(this._elRef.nativeElement.value.length + '/' + String(this._limit));

		this._renderer2.appendChild(countElement, elementValue);
		this._renderer2.appendChild(this._elRef.nativeElement.parentElement, countElement);
		this._renderer2.addClass(this._elRef.nativeElement.nextElementSibling, 'max-words');
	}
}
