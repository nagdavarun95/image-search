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
  fullImg = false;
  searchText: string = null;
  sendData = { client_id: this.client_id, page: this.pageNo, per_page: this.perPage };
  filterForm: any = FormGroup;
  normalData: boolean;
  filterData: boolean
  noMoreData = false;
  errMsg
  fullscreenImg
  constructor(
    private imageFilterService: ImageFiltersService,
    private fb: FormBuilder,
  ) { }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.normalData == true)
        this.showData()
      else
        this.searchFilterApi()
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
        this.normalData = true;
        this.filterData = false;
        this.imageDatafromApi.push(...res);
        this.pageNo++;
        this.sendData["page"] = this.pageNo
      },
      err => {
        console.log("err", err)
        this.errMsg = err.error.errors[0]
      }
    )

  }

  // search and filter function
  searchFilter(key) {
    this.pageNo = 1
    this.sendData['page'] = 1
    var formData = this.filterForm.value;
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
    this.searchFilterApi();
  }

  // call search API
  searchFilterApi() {
    if (this.sendData['page'] == 1) {
      this.imageDatafromApi = []
    }
    this.imageFilterService.searchType(this.sendData).subscribe(
      res => {
        this.normalData = false;
        this.filterData = true;
        this.imageDatafromApi.push(...res.results)
        this.pageNo++;
        this.sendData["page"] = this.pageNo
        if (this.pageNo > 1 && res.results.length == 0) {
          this.noMoreData = true;
        }
        else {
          this.errMsg = "No data found"
        }
      },
      err => {
        console.log("err", err)
        this.errMsg = err.error.errors[0]
      }
    )

  }

  // clear filters
  clearForm() {
    this.filterForm.reset();
    delete this.sendData['color'];
    delete this.sendData['orientation'];
    delete this.sendData['order_by'];
    delete this.sendData['query'];
    this.searchText = "";
    this.pageNo = 1
    this.sendData['page'] = 1
    this.imageDatafromApi = []
    this.showData();
  }

  // open fullscreen image.
  openFullScreen(imgData) {
    this.fullImg = true
    this.fullscreenImg = imgData
  }
}
