import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css'],
})
export class DynamicComponent implements OnInit {
  @Input() index: number;
  @Input() compInput: string;

  @Output() newStringEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() outputEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() newArrayEvent: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  childArray = ['childEl-1', 'childEl-2', 'childEl-3'];

  putOutBoolean() {
    this.outputEvent.emit(true);
  }

  putOutString(value: string) {
    this.newStringEvent.emit(value);
  }

  putOutArray(value: string) {
    this.childArray.push(value);
    this.newArrayEvent.emit(this.childArray);
  }

  constructor() {}

  ngOnInit(): void {}
}
