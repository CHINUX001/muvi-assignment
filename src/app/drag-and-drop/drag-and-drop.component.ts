import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as _ from 'lodash';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {
  modalRef: BsModalRef;
  imageSettingsForm: FormGroup;
  videoSettingsForm: FormGroup;

  defaultImageProperties = {
    type: 'image',
    source: 'https://www.w3schools.com/html/pic_trulli.jpg',
    align: 'left',
    stylings: {
      width: 'auto',
      height: '200px',
      border: 'none',
      margin: '0px',
      padding: '0px',
    },
  }

  defaultVideoProperties = {
    type: 'video',
    source: 'https://www.w3schools.com/html/mov_bbb.mp4',
    autoPlay: false,
    align: 'center',
    stylings: {
      width: 'auto',
      height: '160px',
      border: 'none',
      margin: '0px',
      padding: '0px',
    },
  }
  todo = [this.defaultImageProperties, this.defaultVideoProperties];
  done = [];
  @ViewChild('modalTemplate', {static: true}) modalTemplate: ElementRef;
  currentDroppingItemType: string;

  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.intializeImageForm();
    this.intializeVideoForm();
  }

  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data,
                        event.previousIndex, event.currentIndex);
      if (event.container.id === 'list-two') {
        this.currentDroppingItemType = (_.last(this.done)).type;
        this.modalRef = this.modalService.show(this.modalTemplate);
      }
    }
  }

  entered(event) {
    console.log('cool event', event);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  intializeImageForm() {
    this.imageSettingsForm = this.formBuilder.group({
      type: [this.defaultImageProperties.type],
      source: [this.defaultImageProperties.source],
      align: [this.defaultImageProperties.align],
      stylings: this.formBuilder.group({
        width: [this.defaultImageProperties.stylings.width, [Validators.required]],
        height: [this.defaultImageProperties.stylings.height, [Validators.required]],
        border: [this.defaultImageProperties.stylings.border, [Validators.required]],
        margin: [this.defaultImageProperties.stylings.margin, [Validators.required]],
        padding: [this.defaultImageProperties.stylings.padding, [Validators.required]],
      })
    });
  }

  intializeVideoForm() {
    this.videoSettingsForm = this.formBuilder.group({
      type: [this.defaultVideoProperties.type],
      source: [this.defaultVideoProperties.source],
      align: [this.defaultVideoProperties.align],
      autoplay: [this.defaultVideoProperties.autoPlay],
      stylings: this.formBuilder.group({
        width: [this.defaultVideoProperties.stylings.width, [Validators.required]],
        height: [this.defaultVideoProperties.stylings.height, [Validators.required]],
        border: [this.defaultVideoProperties.stylings.border, [Validators.required]],
        margin: [this.defaultVideoProperties.stylings.margin, [Validators.required]],
        padding: [this.defaultVideoProperties.stylings.padding, [Validators.required]],
      })
    });
  }

  submitImageSettingsForm(): void {
    if (this.imageSettingsForm.valid) {
      let imagePropertiesIndex = _.findIndex(this.done, (item) => {
        return item && item.type === 'image';
      })
      if (imagePropertiesIndex >= 0) {
        this.done[imagePropertiesIndex] = this.imageSettingsForm.value;
      }
      this.modalRef.hide();
    }
  }

  submitVideoSettingsForm(): void {
    if (this.videoSettingsForm.valid) {
      let videoPropertiesIndex = _.findIndex(this.done, (item) => {
        return item && item.type === 'video';
      })
      if (videoPropertiesIndex >= 0) {
        this.done[videoPropertiesIndex] = this.videoSettingsForm.value;
      }
      this.modalRef.hide();
    }
  }

  isImageSettingsInvalid(): boolean {
    return this.imageSettingsForm.invalid ? true : false;
  }

}
