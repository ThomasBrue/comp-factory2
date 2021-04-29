import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'comp-factory2';

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private counter = 1;

  myString = 'defaultString';
  myArray: string[] = ['item1', 'item2', 'item3', 'item4'];

  myArrayFromChild: string[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  add(compInput: string = ''): void {
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      DynamicComponent
    );

    // add the component to the view
    const componentRef = this.container.createComponent(componentFactory);

    // pass some data to the component
    componentRef.instance.index = this.counter++;
    componentRef.instance['compInput'] = compInput;

    componentRef.instance.outputEvent.subscribe((val: boolean) =>
      console.log(val)
    );

    componentRef.instance.newStringEvent.subscribe((val: string) => {
      console.log('myString: ', val);
      this.myString = val;

      console.log('myArray: ', this.myArray);
      this.myArray.push(val);
      this.myArray = [...this.myArray];
    });

    componentRef.instance.newArrayEvent.subscribe((val: string[]) => {
      console.log(val);

      this.myArrayFromChild = [...val];
    });
  }
}
