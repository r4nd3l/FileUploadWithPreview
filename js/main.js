// Default DevCorner JavaScript Setting
! function(A, g) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = g() : "function" == typeof define && define.amd ? define(g) : A.FileUploadWithPreview = g()
}(this, function() {
  "use strict";
  var A = function() {
    function E(A, g) {
      for (var B = 0; B < g.length; B++) {
        var E = g[B];
        E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(A, E.key, E)
      }
    }
    return function(A, g, B) {
      return g && E(A.prototype, g), B && E(A, B), A
    }
  }();
  return function() {
    function B(A, g) {
      if (function(A, g) {
        if (!(A instanceof g)) throw new TypeError("Cannot call a class as a function")
      }(this, B), !A) throw new Error("No uploadId found. You must initialize file-upload-with-preview with a unique uploadId.");
      if (this.uploadId = A, this.options = g || {}, this.options.showDeleteButtonOnImages = !this.options.hasOwnProperty("showDeleteButtonOnImages") || this.options.showDeleteButtonOnImages, this.options.text = this.options.hasOwnProperty("text") ? this.options.text : {
        chooseFile: "Choose file..."
      }, this.options.text.chooseFile = this.options.text.hasOwnProperty("chooseFile") ? this.options.text.chooseFile : "Choose file...", this.options.text.browse = this.options.text.hasOwnProperty("browse") ? this.options.text.browse : "Browse", this.cachedFileArray = [], this.selectedFilesCount = 0, this.el = document.querySelector('.custom-file-container[data-upload-id="' + this.uploadId + '"]'), !this.el) throw new Error("Could not find a 'custom-file-container' with the id of: " + this.uploadId);
      if (this.input = this.el.querySelector('input[type="file"]'), this.inputLabel = this.el.querySelector(".custom-file-container__custom-file__custom-file-control"), this.imagePreview = this.el.querySelector(".custom-file-container__image-preview"), this.clearButton = this.el.querySelector(".custom-file-container__image-clear"), this.inputLabel.innerHTML = this.options.text.chooseFile, this.addBrowseButton(this.options.text.browse), !(this.el && this.input && this.inputLabel && this.imagePreview && this.clearButton)) throw new Error("Cannot find all necessary elements. Please make sure you have all the necessary elements in your html for the id: " + this.uploadId);
      this.baseImage = "img/placeholder.jpg", this.bindClickEvents(), this.imagePreview.style.backgroundImage = 'url("' + this.baseImage + '")'
    }
    return A(B, [{
      key: "bindClickEvents",
      value: function() {
        var C = this,
        Q = this;
        Q.input.addEventListener("change", function(A) {
          if (0 !== this.files.length) {
            Q.input.multiple ? Q.selectedFilesCount += this.files.length : (Q.selectedFilesCount = this.files.length, Q.cachedFileArray = []);
            for (var g = 0; g < this.files.length; g++) {
              var B = this.files[g];
              B.token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), Q.cachedFileArray.push(B), Q.processFile(B)
            }
            var E = new CustomEvent("fileUploadWithPreview:imageSelected", {
              detail: {
                uploadId: Q.uploadId,
                cachedFileArray: Q.cachedFileArray,
                selectedFilesCount: Q.selectedFilesCount
              }
            });
            window.dispatchEvent(E)
          }
        }, !0), this.clearButton.addEventListener("click", function() {
          C.clearImagePreviewPanel()
        }, !0), this.imagePreview.addEventListener("click", function(A) {
          if (A.target.matches(".custom-file-container__image-multi-preview__single-image-clear__icon")) {
            var g = A.target.getAttribute("data-upload-token"),
            B = C.cachedFileArray.findIndex(function(A) {
              return A.token === g
            });
            C.cachedFileArray.splice(B, 1), C.imagePreview.innerHTML = "", C.selectedFilesCount = C.cachedFileArray.length, C.cachedFileArray.forEach(function(A) {
              return C.processFile(A)
            }), C.cachedFileArray.length || C.clearImagePreviewPanel();
            var E = new CustomEvent("fileUploadWithPreview:imageDeleted", {
              detail: {
                uploadId: C.uploadId,
                cachedFileArray: C.cachedFileArray,
                selectedFilesCount: C.selectedFilesCount
              }
            });
            window.dispatchEvent(E)
          }
        })
      }
    }, {
      key: "processFile",
      value: function(g) {
        var B = this;
        0 === this.selectedFilesCount ? this.inputLabel.innerHTML = this.options.text.chooseFile : 1 === this.selectedFilesCount ? this.inputLabel.innerHTML = g.name : this.inputLabel.innerHTML = this.selectedFilesCount + " files selected", this.addBrowseButton(this.options.text.browse), this.imagePreview.classList.add("custom-file-container__image-preview--active");
        var E = new FileReader;
        E.readAsDataURL(g), E.onload = function(A) {
          B.input.multiple || (g.type.match("image/png") || g.type.match("image/jpeg") || g.type.match("image/gif") ? B.imagePreview.style.backgroundImage = 'url("' + E.result + '")' : g.type.match("application/pdf") ? B.imagePreview.style.backgroundImage = 'url("' + B.successPdfImage + '")' : g.type.match("video/*") ? B.imagePreview.style.backgroundImage = 'url("' + B.successVideoImage + '")' : B.imagePreview.style.backgroundImage = 'url("' + B.successFileAltImage + '")'), B.input.multiple && (B.imagePreview.style.backgroundImage = 'url("' + B.blankImage + '")', g.type.match("image/png") || g.type.match("image/jpeg") || g.type.match("image/gif") ? B.options.showDeleteButtonOnImages ? B.imagePreview.innerHTML += '\n                            <div>\n                                <span\n                                    class="custom-file-container__image-multi-preview"\n                                    style="background-image: url(\'' + E.result + '\'); "\n                                >\n                                    <span class="custom-file-container__image-multi-preview__single-image-clear">\n                                        <span\n                                            class="custom-file-container__image-multi-preview__single-image-clear__icon"\n                                            data-upload-token="' + g.token + '"\n                                        >&times;</span>\n                                    </span>\n                                </span>\n\n                            </div>\n                        ' : B.imagePreview.innerHTML += '\n                            <div>\n                                <span\n                                    class="custom-file-container__image-multi-preview"\n                                    style="background-image: url(\'' + E.result + "'); \"\n                                ></span>\n                            </div>\n                        " : g.type.match("application/pdf") ? B.options.showDeleteButtonOnImages ? B.imagePreview.innerHTML += '\n                            <div>\n                                <span\n                                    class="custom-file-container__image-multi-preview"\n                                    style="background-image: url(\'' + B.successPdfImage + '\'); "\n                                >\n                                    <span class="custom-file-container__image-multi-preview__single-image-clear">\n                                        <span\n                                            class="custom-file-container__image-multi-preview__single-image-clear__icon"\n                                            data-upload-token="' + g.token + '"\n                                        >&times;</span>\n                                    </span>\n                                </span>\n\n                            </div>\n                        ' : B.imagePreview.innerHTML += '\n                            <div>\n                                <span\n                                    class="custom-file-container__image-multi-preview"\n                                    style="background-image: url(\'' + B.successPdfImage + "'); \"\n                                ></span>\n                            </div>\n                        " : g.type.match("video/*") ? B.options.showDeleteButtonOnImages ? B.imagePreview.innerHTML += '\n                            <div>\n                                <span\n                                    class="custom-file-container__image-multi-preview"\n                                    style="background-image: url(\'' + B.successVideoImage + '\'); "\n                                >\n                                    <span class="custom-file-container__image-multi-preview__single-image-clear">\n                                        <span\n                                            class="custom-file-container__image-multi-preview__single-image-clear__icon"\n                                            data-upload-token="' + g.token + '"\n                                        >&times;</span>\n                                    </span>\n                                </span>\n\n                            </div>\n                        ' : B.imagePreview.innerHTML += '\n                            <div>\n                                <span\n                                    class="custom-file-container__image-multi-preview"\n                                    style="background-image: url(\'' + B.successVideoImage + "'); \"\n                                ></span>\n                            </div>\n                        " : B.options.showDeleteButtonOnImages ? B.imagePreview.innerHTML += '\n                            <div>\n                                <span\n                                    class="custom-file-container__image-multi-preview"\n                                    style="background-image: url(\'' + B.successFileAltImage + '\'); "\n                                >\n                                    <span class="custom-file-container__image-multi-preview__single-image-clear">\n                                        <span\n                                            class="custom-file-container__image-multi-preview__single-image-clear__icon"\n                                            data-upload-token="' + g.token + '"\n                                        >&times;</span>\n                                    </span>\n                                </span>\n\n                            </div>\n                        ' : B.imagePreview.innerHTML += '\n                            <div>\n                                <span\n                                    class="custom-file-container__image-multi-preview"\n                                    style="background-image: url(\'' + B.successFileAltImage + "'); \"\n                                ></span>\n                            </div>\n                        ")
        }
      }
    }, {
      key: "addBrowseButton",
      value: function(A) {
        this.inputLabel.innerHTML += '<span class="custom-file-container__custom-file__custom-file-control__button">' + A + "</span>"
      }
    }, {
      key: "selectImage",
      value: function() {
        this.input.click()
      }
    }, {
      key: "clearImagePreviewPanel",
      value: function() {
        this.input.value = "", this.inputLabel.innerHTML = this.options.text.chooseFile, this.addBrowseButton(this.options.text.browse), this.imagePreview.style.backgroundImage = 'url("' + this.baseImage + '")', this.imagePreview.classList.remove("custom-file-container__image-preview--active"), this.cachedFileArray = [], this.imagePreview.innerHTML = "", this.selectedFilesCount = 0
      }
    }]), B
  }()
});
