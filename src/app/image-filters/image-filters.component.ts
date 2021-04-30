import { Component, OnInit, HostListener } from '@angular/core';
import { ImageFiltersService } from './image-filters.service';
import { FormGroup, FormBuilder } from '@angular/forms';
declare const $: any;

@Component({
  selector: 'app-image-filters',
  templateUrl: './image-filters.component.html',
  styleUrls: ['./image-filters.component.css']
})
export class ImageFiltersComponent implements OnInit {
  client_id = "FZpIl7feLseFHwV4DScQqiaVULO54C7GRBiqlmDrxdI";
  pageNo = 1;
  perPage = 24;
  imageDatafromApi = [];
  zoomImage;
  fullImg = false;
  searchText: string = null;
  filterset = {};
  sendData = { client_id: this.client_id, page: this.pageNo, per_page: this.perPage };
  filterForm: any = FormGroup;
  constructor(
    private imageFilterService: ImageFiltersService,
    private fb: FormBuilder,
  ) { }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("you're at the bottom of the page")
      // this.showData()
    }
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      sortRadio: [''],
      colorRadio: [''],
      orientRadio: [''],
    })
    this.showData()
  }

  // initial call function
  showData() {
    this.imageFilterService.getImageData(this.sendData).subscribe(
      res => {
        console.log("res", res)
        this.imageDatafromApi = res
      },
      err => {
        console.log("err", err)
      }
    )
    this.pageNo++
  }

  // search and filter function
  searchFilter(key) {
    console.log("this.filterForm.value", this.filterForm.value)
    var formData = this.filterForm.value;
    console.log("formData", formData)
    if (key == 'text')
      this.sendData['query'] = this.searchText;

    if (key == 'sort' || (formData.sortRadio != "" && formData.sortRadio != null)) {
      this.sendData['order_by'] = formData.sortRadio;
    }
    else {
      delete this.sendData['order_by']
    }

    if (key == 'color' && (formData.colorRadio != "" && formData.colorRadio != null && formData.colorRadio != "anyColor")) {
      this.sendData['color'] = formData.colorRadio;
    }
    else if (key != 'color' && (formData.colorRadio != "" && formData.colorRadio != null && formData.colorRadio != "anyColor")) {
      this.sendData['color'] = formData.colorRadio;
    }
    else {
      delete this.sendData['color']
    }

    if (key == 'orientation' && (formData.orientRadio != "" && formData.orientRadio != null && formData.orientRadio != "anyOrient")) {
      this.sendData['orientation'] = formData.orientRadio;
    }
    else if (key != 'orientation' && (formData.orientRadio != "" && formData.orientRadio != null && formData.orientRadio != "anyOrient")) {
      this.sendData['orientation'] = formData.orientRadio;
    }
    else {
      delete this.sendData['orientation']
    }

    console.log("this.sendData", this.sendData)
    this.imageFilterService.searchType(this.sendData).subscribe(
      res => {
        console.log("res", res)
        this.imageDatafromApi = res.results
      },
      err => {
        console.log("err", err)
      }
    )
  }

  clearForm() {
    this.filterForm.reset();
    delete this.sendData['color'];
    delete this.sendData['orientation'];
    delete this.sendData['order_by'];
    delete this.sendData['query'];
    this.searchText = "";
    this.showData();
  }

  // open fullscreen image.
  openFullScreen() {
    this.fullImg = true
  }
}
