app.service("AddAssetInventoryService", ['$http', '$q', 'UtilityService', function ($http, $q, UtilityService) {
    function handleAPIRequest(promise) {
        var deferred = $q.defer();
        promise.then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    this.GetAssetMainCategory = function () {
        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetMainCategory'));
    };
    this.GetAssetSubCategory = function () {
        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetSubCategory'));
    };
    this.GetAssetBrand = function () {
        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetBrand'));
    };
    this.GetAssetModel = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetModel'));
    };
    this.GetAssetlOCATION = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetLOCATION'));
    };
    this.GetAssettower = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/Assettower'));
    };
    this.GetAssetfloor = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/Assetfloor'));
    };
    this.GetAssetSpace = function (lcmCode, twrCode, flrCode) {
        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetSpace', {
            params: { lcmCode: lcmCode, twrCode: twrCode, flrCode: flrCode }
        }));
    };
    this.GetAssetEmployee = function (lcmCode) {
        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetEmployee', {
            params: { lcmCode: lcmCode }
        }));
    };
    this.GetCC = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/GetCostcenter'));
    };
    this.GetAssetVENDOR = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetVendor'));
    };
    //this.GetGridData = function (paginationParams) {
    //    
    //    return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/GetData', paginationParams ));
    //};
    this.GetGridData = function (obj) {

        return handleAPIRequest($http.post(UtilityService.path + '/api/AddAssetInventory/GetData', obj));
    };
    this.GetAssetTYPE = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/Assettype'));
    };
    this.BindCompany = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/GetCompany'));
    };
    this.GetDetailsbyID = function (obj) {

        return handleAPIRequest($http.post(UtilityService.path + '/api/AddAssetInventory/GetDetailsById', obj));
    };
    this.SaveAssetDetails = function (obj) {

        return handleAPIRequest($http.post(UtilityService.path + '/api/AddAssetInventory/SaveRecord', obj));
    };
    this.ModifyAssetDetails = function (obj) {

        return handleAPIRequest($http.post(UtilityService.path + '/api/AddAssetInventory/ModifyAssetDetails', obj));
    };
    this.GetAstLabel = function (obj) {

        return handleAPIRequest($http.post(UtilityService.path + '/api/AddAssetInventory/GetAssetLable', obj));
    };

    this.GetSubcategoryAssetIdEnabled = function () {
        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/SubcategoryAssetIdEnabled'));
    };

    this.GetNextAssetCodeBySubCategory = function (obj) {
        return handleAPIRequest($http.post(UtilityService.path + '/api/AddAssetInventory/GetNextAssetCodeBySubCategory', obj));
    };

    this.GetAssetCity = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/AssetCity_ForTransfer'));
    };

    this.GetAssetlOCATIONS_ForTransfer = function () {

        return handleAPIRequest($http.get(UtilityService.path + '/api/AddAssetInventory/GetAssetlOCATIONS_ForTransfer'));
    };

}]);

/** Web API may serialize PascalCase or camelCase; DataTable may be an array or { Table: [...] }. */
function apiMessage(res) {
    if (!res) return '';
    var m = '';
    if (res.Message !== undefined && res.Message !== null) m = res.Message;
    else if (res.message !== undefined && res.message !== null) m = res.message;
    return (m != null && typeof m === 'string') ? m.trim() : (m != null ? String(m).trim() : '');
}
function apiDataRows(res) {
    if (!res) return [];
    if (res.Table && Array.isArray(res.Table)) return res.Table;
    if (res.table && Array.isArray(res.table)) return res.table;
    var d = res.data !== undefined ? res.data : res.Data;
    if (d == null) return [];
    if (Array.isArray(d)) return d;
    if (d.Table && Array.isArray(d.Table)) return d.Table;
    if (d.table && Array.isArray(d.table)) return d.table;
    // Newtonsoft / Web API: DataTable sometimes serializes as an object whose first array prop is rows
    if (typeof d === 'object' && !Array.isArray(d)) {
        var keys = Object.keys(d);
        for (var i = 0; i < keys.length; i++) {
            var v = d[keys[i]];
            if (Array.isArray(v) && v.length && typeof v[0] === 'object') return v;
        }
    }
    return [];
}
/** Read location id from BIND_ASSET_LOCATION row / multi-select output (property casing varies by JSON serializer). */
function resolveLocationCodeFromItem(locItem) {
    if (locItem == null) return '';
    if (typeof locItem === 'string' || typeof locItem === 'number') return String(locItem).trim();
    if (typeof locItem !== 'object') return '';
    var keys = ['lCMCODE', 'lcMCODE', 'LCmCODE', 'LCM_CODE', 'lcm_CODE', 'lcm_code', 'LcmCode'];
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (locItem[k] !== undefined && locItem[k] !== null) {
            var s = String(locItem[k]).trim();
            if (s !== '') return s;
        }
    }
    return '';
}
/** Resolve model row + codes for GET_ASSET_LABLE (MdCode/MdName casing; output may be plain code string). */
function resolveModelForAssetLabel(assetModelList) {
    if (!assetModelList) return null;
    var ticked = null;
    if (typeof assetModelList.find === 'function') {
        ticked = assetModelList.find(function (item) { return item && item.ticked === true; });
    }
    if (!ticked && assetModelList.MdCode && assetModelList.MdCode.length) {
        ticked = assetModelList.MdCode[0];
    }
    if (!ticked) return null;
    if (typeof ticked === 'string' || typeof ticked === 'number') {
        var codeOnly = String(ticked).trim();
        if (!codeOnly) return null;
        var mdName = codeOnly;
        if (typeof assetModelList.find === 'function') {
            var found = assetModelList.find(function (item) {
                if (!item) return false;
                var c = item.MdCode != null ? item.MdCode : (item.mdCode != null ? item.mdCode : '');
                return String(c) === codeOnly;
            });
            if (found) {
                mdName = (found.MdName != null ? String(found.MdName).trim() : '')
                    || (found.mdName != null ? String(found.mdName).trim() : '')
                    || codeOnly;
            }
        }
        return { MdCode: codeOnly, MdName: mdName };
    }
    var mdCode = (ticked.MdCode != null ? String(ticked.MdCode).trim() : '')
        || (ticked.mdCode != null ? String(ticked.mdCode).trim() : '');
    if (!mdCode) return null;
    var mdName = (ticked.MdName != null ? String(ticked.MdName).trim() : '')
        || (ticked.mdName != null ? String(ticked.mdName).trim() : '')
        || mdCode;
    return { MdCode: mdCode, MdName: mdName };
}
/** Model row for save: prefer ticked row, else isteven output (MdCode) — matches GetAssetLabel resolution. */
function resolveModelRowForSave(assetModelList) {
    if (!assetModelList) return null;
    var ticked = null;
    if (typeof assetModelList.find === 'function') {
        ticked = assetModelList.find(function (item) { return item && item.ticked === true; });
    }
    if (ticked) {
        var c = ticked.MdCode != null ? ticked.MdCode : ticked.mdCode;
        var n = ticked.MdName != null ? ticked.MdName : ticked.mdName;
        if (c != null && String(c).trim() !== '') {
            var cs = String(c).trim();
            var ns = (n != null && String(n).trim() !== '') ? String(n).trim() : cs;
            return { MdCode: cs, MdName: ns };
        }
    }
    return resolveModelForAssetLabel(assetModelList);
}
/** First row value from GET_ASSET_LABLE / GetAssetLable (DataSet JSON shape varies by serializer). */
function firstGeneratedAssetCodeFromLabelApi(res) {
    if (!res) return '';
    var rows = apiDataRows(res);
    if (!rows.length && typeof res === 'object' && res !== null) {
        for (var k in res) {
            if (!Object.prototype.hasOwnProperty.call(res, k)) continue;
            var v = res[k];
            if (Array.isArray(v) && v.length && typeof v[0] === 'object') {
                rows = v;
                break;
            }
        }
    }
    if (!rows.length) return '';
    var row = rows[0] || {};
    var v = row.AAT_NAME;
    if (v == null || String(v).trim() === '') v = row.aat_NAME != null ? row.aat_NAME : row.AAT_CODE;
    if (v == null || String(v).trim() === '') v = row.aat_CODE != null ? row.aat_CODE : row.AST_CODE;
    if (v == null || String(v).trim() === '') v = row.ast_CODE != null ? row.ast_CODE : row.GeneratedCode;
    if (v == null || String(v).trim() === '') v = row.generatedCode != null ? row.generatedCode : row.NEXT_ASSET_CODE;
    if (v == null || String(v).trim() === '') v = row.next_ASSET_CODE != null ? row.next_ASSET_CODE : row.AST_LABLE;
    if (v == null || String(v).trim() === '') v = row.ast_LABLE != null ? row.ast_LABLE : row.ASSET_CODE;
    if (v == null || String(v).trim() === '') v = row.asset_CODE != null ? row.asset_CODE : row.LABEL;
    return v != null ? String(v).trim() : '';
}
function rowAstId(row) {
    if (!row) return undefined;
    if (row.AAT_ID !== undefined && row.AAT_ID !== null && row.AAT_ID !== '') return row.AAT_ID;
    if (row.aAT_ID !== undefined && row.aAT_ID !== null && row.aAT_ID !== '') return row.aAT_ID;
    if (row.aat_ID !== undefined && row.aat_ID !== null && row.aat_ID !== '') return row.aat_ID;
    if (row.aat_id !== undefined && row.aat_id !== null && row.aat_id !== '') return row.aat_id;
    if (row.AAT_AST_SERIALNO !== undefined && row.AAT_AST_SERIALNO !== null && row.AAT_AST_SERIALNO !== '') return row.AAT_AST_SERIALNO;
    if (row.aat_AST_SERIALNO !== undefined && row.aat_AST_SERIALNO !== null && row.aat_AST_SERIALNO !== '') return row.aat_AST_SERIALNO;
    if (row.AST_ID !== undefined) return row.AST_ID;
    if (row.ast_ID !== undefined) return row.ast_ID;
    if (row.ast_id !== undefined) return row.ast_id;
    return undefined;
}
function rowAurName(row) {
    if (!row) return undefined;
    if (row.AUR_KNOWN_AS !== undefined && row.AUR_KNOWN_AS !== null && row.AUR_KNOWN_AS !== '') return row.AUR_KNOWN_AS;
    if (row.aUR_KNOWN_AS !== undefined && row.aUR_KNOWN_AS !== null && row.aUR_KNOWN_AS !== '') return row.aUR_KNOWN_AS;
    if (row.aur_KNOWN_AS !== undefined && row.aur_KNOWN_AS !== null && row.aur_KNOWN_AS !== '') return row.aur_KNOWN_AS;
    if (row.aur_known_as !== undefined && row.aur_known_as !== null && row.aur_known_as !== '') return row.aur_known_as;
    if (row.AUR_NAME !== undefined && row.AUR_NAME !== null && row.AUR_NAME !== '') return row.AUR_NAME;
    if (row.aUR_NAME !== undefined && row.aUR_NAME !== null && row.aUR_NAME !== '') return row.aUR_NAME;
    if (row.aur_NAME !== undefined && row.aur_NAME !== null && row.aur_NAME !== '') return row.aur_NAME;
    return undefined;
}
/** True when isteven output-model has a selection (array, object, or scalar). */
function multiSelectOutputHasValue(v) {
    if (v == null || v === '') return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object') return Object.keys(v).length > 0;
    return String(v).trim() !== '';
}
/** Single-char token for form proxy ng-model (text input cannot bind to array from multi-select). */
function multiSelectProxyToken(v) {
    return multiSelectOutputHasValue(v) ? '1' : '';
}
function firstTicked(list) {
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < list.length; i++) {
        if (list[i] && list[i].ticked) return list[i];
    }
    return null;
}
function tickSingleByCode(list, codeKey, codeVal) {
    if (!Array.isArray(list)) return null;
    var target = null;
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var isMatch = item && codeVal !== undefined && codeVal !== null && String(item[codeKey]) === String(codeVal);
        item.ticked = !!isMatch;
        if (isMatch) target = item;
    }
    return target;
}
function tickSingleByAny(list, keyCandidates, codeVal) {
    if (!Array.isArray(list)) return null;
    var normalized = (codeVal !== undefined && codeVal !== null) ? String(codeVal) : '';
    if (normalized === '') return null;
    var target = null;
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var isMatch = false;
        if (item) {
            for (var k = 0; k < keyCandidates.length; k++) {
                var key = keyCandidates[k];
                if (item[key] !== undefined && item[key] !== null && String(item[key]) === normalized) {
                    isMatch = true;
                    break;
                }
            }
        }
        item.ticked = !!isMatch;
        if (isMatch) target = item;
    }
    return target;
}
function getSelectedFromOutputModel(list, outputKey) {
    if (!list || !outputKey) return null;
    var out = list[outputKey];
    if (Array.isArray(out) && out.length) return out[0];
    return firstTicked(list);
}

/** Current main grid rows (ag-Grid does not keep rowData in sync when using setRowData / datasource). */
function getMainGridRowsSnapshot($scope) {
    var rows = [];
    if ($scope.gridOptions && $scope.gridOptions.api && typeof $scope.gridOptions.api.forEachNode === 'function') {
        try {
            $scope.gridOptions.api.forEachNode(function (node) {
                if (node && node.data) rows.push(node.data);
            });
        } catch (e) { /* ignore */ }
    }
    if (!rows.length && $scope.griddata && Array.isArray($scope.griddata)) {
        rows = angular.copy($scope.griddata);
    }
    return rows;
}

function sessionUserFallback() {
    if (typeof window !== 'undefined' && window.UID != null && String(window.UID).trim() !== '') return String(window.UID).trim();
    if (typeof UID !== 'undefined' && UID != null && String(UID).trim() !== '') return String(UID).trim();
    return '';
}
function toastErrorMessage(res) {
    var msg = apiMessage(res);
    var d = res && (res.data !== undefined ? res.data : res.Data);
    if (typeof d === 'string' && d.trim()) return d.trim();
    if (msg && msg.toLowerCase().indexOf('something went wrong') < 0) return msg;
    var info = res && (res.Info !== undefined ? res.Info : res.info);
    if (info != null) {
        if (typeof info === 'string' && info.trim()) return info.trim();
        if (typeof info === 'object' && info.Message) return String(info.Message).trim();
        if (typeof info === 'object' && info.message) return String(info.message).trim();
    }
    if (msg) return msg;
    return 'Something went wrong. Please try again.';
}

function parseAjaxErrorPayload(xhr) {
    if (!xhr) return null;
    try {
        if (xhr.responseJSON) return xhr.responseJSON;
        if (xhr.responseText) return JSON.parse(xhr.responseText);
    } catch (e) { /* ignore */ }
    return null;
}

app.controller('AddAssetInventoryController', ['$scope', '$q', 'AddAssetInventoryService', 'UtilityService', '$timeout', '$http', '$filter', function ($scope, $q, AddAssetInventoryService, UtilityService, $timeout, $http, $filter) {
    function applyClientSearch(rows, searchText) {
        var list = Array.isArray(rows) ? rows : [];
        var q = (searchText || '').toString().toLowerCase().trim();
        if (!q) return list;
        return list.filter(function (row) {
            if (!row || typeof row !== 'object') return false;
            for (var k in row) {
                if (!Object.prototype.hasOwnProperty.call(row, k)) continue;
                var v = row[k];
                if (v === null || v === undefined) continue;
                if (String(v).toLowerCase().indexOf(q) !== -1) return true;
            }
            return false;
        });
    }
    $scope.AssetMainCategoryList = [];
    $scope.AssetSubCategoryList = [];
    $scope.AssetBrandList = [];
    $scope.AssetModelList = [];
    $scope.AssetlOCATIONList = [];
    $scope.AssetCityList = [];
    $scope.AssetlOCATIONTransferList = [];
    $scope.AssetTowerList = [];
    $scope.AssetFloorList = [];
    $scope.AssetSpaceList = [];
    $scope.AssetEmployeeList = [];
    $scope.CostcenterList = [];
    $scope.AssetVENDORList = [];
    $scope.AssetTYPEList = [];
    $scope.AssetCompanyList = [];
    var selectedFiles = { Files: [] };
    var selecteddata = {};
    var Documents = [];
    $scope.StaDet = [{ Id: 1, Name: 'Active' }, { Id: 0, Name: 'Inactive' }];
    $scope.StaDet.StatusCode = [];
    $scope.AddInventory = {};
    function setStatusSelection(statusValue) {
        var normalized = (statusValue !== undefined && statusValue !== null) ? statusValue.toString() : "1";
        angular.forEach($scope.StaDet, function (item) {
            item.ticked = (item.Id.toString() === normalized);
        });
        $scope.StaDet.StatusCode = $scope.StaDet.filter(function (item) { return item.ticked; });
        $scope.AddInventory.STATUS = normalized;
    }
    $scope.onStatusChange = function () {
        if ($scope.StaDet.StatusCode && $scope.StaDet.StatusCode.length > 0) {
            $scope.AddInventory.STATUS = $scope.StaDet.StatusCode[0].Id.toString();
        }
    };
    $scope.AddInventory.STATUS = "1";
    $scope.AddInventory.rateContract = "1";
    $scope.AddInventory.selectedType = "NewAssetsAdd";
    $scope.AddInventory.AMC = "1";
    $scope.AddInventory.Insurance = "1";
    $scope.AddInventory.Count = "1";
    $scope.AddInventory.AAT_COST = 0;
    /** Hidden validation fields: isteven output is often an array — binding it to type="text" breaks Angular validation ($error.pattern) with no visible highlight. */
    $scope.formProxies = {
        maincat: '', subcat: '', brand: '', model: '', loc: '', tower: '', floor: '',
        vendor: '', assettype: '', company: '',
        ctyTransfer: '', lcmTransfer: '', costCenter: ''
    };
    $scope.refreshAddInventoryFormProxies = function () {
        if (!$scope.formProxies) {
            $scope.formProxies = {};
        }
        var fp = $scope.formProxies;
        fp.maincat = multiSelectProxyToken($scope.AssetMainCategoryList && $scope.AssetMainCategoryList.Assetmaincatcode);
        fp.subcat = multiSelectProxyToken($scope.AssetSubCategoryList && $scope.AssetSubCategoryList.Assetsubncatcode);
        fp.brand = multiSelectProxyToken($scope.AssetBrandList && $scope.AssetBrandList.BrandCode);
        fp.model = multiSelectProxyToken($scope.AssetModelList && $scope.AssetModelList.MdCode);
        fp.loc = multiSelectProxyToken($scope.AssetlOCATIONList && $scope.AssetlOCATIONList.lCMCODE);
        fp.tower = multiSelectProxyToken($scope.AssetTowerList && $scope.AssetTowerList.twr_CODE);
        fp.floor = multiSelectProxyToken($scope.AssetFloorList && $scope.AssetFloorList.flr_code);
        fp.vendor = multiSelectProxyToken($scope.AssetVENDORList && $scope.AssetVENDORList.vendorCode);
        fp.assettype = multiSelectProxyToken($scope.AssetTYPEList && $scope.AssetTYPEList.Assettype);
        fp.company = multiSelectProxyToken($scope.AssetCompanyList && $scope.AssetCompanyList.AssettCompany);
        fp.ctyTransfer = multiSelectProxyToken($scope.AssetCITYList && $scope.AssetCITYList.CTY_CODE);
        fp.lcmTransfer = multiSelectProxyToken($scope.AssetlOCATIONTransferList && $scope.AssetlOCATIONTransferList.LCM_CODE);
        fp.costCenter = multiSelectProxyToken($scope.CostcenterList && $scope.CostcenterList.Cost_Center_Code);
    };
    $scope.AAT_ID = "";
    $scope.invCurrentPage = 1;
    $scope.invTotalPages = 1;
    $scope.invGridHasData = false;
    $scope.invPageSize = 10;
    var clientSearchAllRowsCache = null;
    var clientSearchCachePromise = null;
    $scope.griddata1 = false;
    $scope.Transfergriddata = true;
    $scope.Modifygriddata = true;
    $scope.save = false;
    $scope.modify = false;
    $scope.EnableStatus = 1;
    $scope.isVisible = false;
    $scope.useSubcategoryAssetCodePref = false;
    $scope.sysPrefAssetSubcatLoaded = false;
    /* ng-pattern for Asset ID: strict for manual entry; permissive when server assigns code from subcategory. */
    $scope.aatNameNgPattern = /^[A-Za-z0-9 /]+$/;
    $scope.rx = {
        qty: /^[0-9]+$/,
        decimal: /^[0-9]+(\.[0-9]{1,2})?$/,
        assetId: /^[A-Za-z0-9 /]+$/,
        lettersSpace: /^[A-Za-z0-9 ]+$/,
        remarks: /^[A-Za-z0-9 .,()/&:]+$/,
        spareId: /^[A-Za-z0-9 /&]+$/
    };
    $scope.spareSubmitted = false;
    var invKeySets = {
        assetId: /[A-Za-z0-9 /]/,
        decimal: /[0-9.]/,
        numbers: /[0-9]/,
        lettersSpace: /[A-Za-z0-9 ]/,
        remarks: /[A-Za-z0-9 .,()/&:]/,
        spareId: /[A-Za-z0-9 /&]/
    };
    $scope.allowInvKey = function (e, kind) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        var code = e.which || e.keyCode;
        if (code < 32) return;
        var ch = String.fromCharCode(code);
        var re = invKeySets[kind];
        if (re && !re.test(ch)) { e.preventDefault(); return; }
        if (kind === 'decimal' && ch === '.' && e.target && String(e.target.value || '').indexOf('.') !== -1) e.preventDefault();
    };
    $scope.checkInv = function (raw, kind, required, emptyMsg, badMsg, maxLen) {
        var v = (raw == null ? '' : String(raw)).replace(/\r?\n/g, ' ').trim();
        if (!v) return required ? { ok: false, message: emptyMsg, value: '' } : { ok: true, message: '', value: '' };
        if (maxLen && v.length > maxLen) return { ok: false, message: badMsg, value: v };
        var pat = $scope.rx[kind];
        if (pat && !pat.test(v)) return { ok: false, message: badMsg, value: v };
        return { ok: true, message: '', value: v };
    };
    $scope.validateInventoryTextFields = function () {
        var inv = $scope.AddInventory || {};
        var skipId = $scope.useSubcategoryAssetCodePref && $scope.sysPrefAssetSubcatLoaded;
        var chk;
        if (!skipId) {
            chk = $scope.checkInv(inv.AAT_NAME, 'assetId', true, 'Please enter Asset ID.', 'Asset ID allows letters, numbers, space and / only.', 50);
            if (!chk.ok) return chk;
            inv.AAT_NAME = chk.value;
        }
        chk = $scope.checkInv(inv.AAT_COST, 'decimal', true, 'Please enter Asset Price.', 'Asset Price (In Cost) allows numbers and decimals only.', 15);
        if (!chk.ok) return chk;
        inv.AAT_COST = chk.value;
        chk = $scope.checkInv(inv.Count, 'qty', false, '', 'Count allows numbers only.', 9);
        if (!chk.ok) return chk;
        inv.Count = chk.value;
        chk = $scope.checkInv(inv.AST_SNO, 'lettersSpace', false, '', 'Asset Serial No allows letters, numbers and space only.', 50);
        if (!chk.ok) return chk;
        inv.AST_SNO = chk.value;
        chk = $scope.checkInv(inv.LIFE_SPAN, 'qty', false, '', 'Life Span (In Years) allows numbers only.', 9);
        if (!chk.ok) return chk;
        inv.LIFE_SPAN = chk.value;
        chk = $scope.checkInv(inv.PO_NUM, 'lettersSpace', false, '', 'PO Number allows letters, numbers and space only.', 50);
        if (!chk.ok) return chk;
        inv.PO_NUM = chk.value;
        chk = $scope.checkInv(inv.Depreciation, 'qty', false, '', 'Depreciation (in %) allows numbers only.', 9);
        if (!chk.ok) return chk;
        inv.Depreciation = chk.value;
        chk = $scope.checkInv(inv.INV_NUM, 'lettersSpace', false, '', 'Invoice Number allows letters, numbers and space only.', 50);
        if (!chk.ok) return chk;
        inv.INV_NUM = chk.value;
        chk = $scope.checkInv(inv.Descrpition, 'remarks', true, 'Please enter Description.', 'Description allows letters, numbers, space and . , ( ) / & : only.', 500);
        if (!chk.ok) return chk;
        inv.Descrpition = chk.value;
        if ($scope.spareList && $scope.spareList.length) {
            for (var i = 0; i < $scope.spareList.length; i++) {
                var sp = $scope.spareList[i];
                if (!sp) continue;
                chk = $scope.checkInv(sp.SparePartID, 'spareId', true, 'Please enter Spare part ID.', 'Spare part ID allows letters, numbers, space / & only.', 50);
                if (!chk.ok) return chk;
                sp.SparePartID = chk.value;
                chk = $scope.checkInv(sp.SparePartName, 'remarks', true, 'Please enter Spare Part Name.', 'Spare Part Name allows letters, numbers, space and . , ( ) / & : only.', 500);
                if (!chk.ok) return chk;
                sp.SparePartName = chk.value;
                chk = $scope.checkInv(sp.Quantity, 'qty', true, 'Please enter Quantity.', 'Quantity allows numbers only.', 9);
                if (!chk.ok) return chk;
                sp.Quantity = parseInt(chk.value, 10);
                chk = $scope.checkInv(sp.Cost, 'decimal', true, 'Please enter Cost.', 'Cost allows numbers and decimals only.', 15);
                if (!chk.ok) return chk;
                sp.Cost = chk.value;
                chk = $scope.checkInv(sp.TotalCost, 'decimal', true, 'Please enter Total Cost.', 'Total Cost allows numbers and decimals only.', 15);
                if (!chk.ok) return chk;
                sp.TotalCost = chk.value;
            }
        }
        return { ok: true };
    };
    $scope.button1Color = null;
    $scope.validateNumb = function () { };

    /** Referenced from aspx ng-change on radios; was undefined and could break digest when toggling AMC/Insurance. */
    $scope.updateUploadDisabled = function () { };

    $scope.showAddInventoryHelp = false;
    $scope.toggleAddInventoryHelp = function ($event) {
        if ($event) $event.stopPropagation();
        $scope.showAddInventoryHelp = !$scope.showAddInventoryHelp;
    };
    $scope.closeAddInventoryHelp = function () {
        $scope.showAddInventoryHelp = false;
    };
    document.addEventListener('click', function () {
        if ($scope.showAddInventoryHelp) {
            $scope.$apply(function () {
                $scope.showAddInventoryHelp = false;
            });
        }
    });

    $scope.invPrevPage = function () {
        if ($scope.invCurrentPage <= 1) return;
        $scope.loadInventoryPage($scope.invCurrentPage - 1);
    };
    $scope.invNextPage = function () {
        if ($scope.invCurrentPage >= $scope.invTotalPages) return;
        $scope.loadInventoryPage($scope.invCurrentPage + 1);
    };
    function normalizedSearchText() {
        var modelSearch = ($scope.AddInventory && $scope.AddInventory.Search != null) ? String($scope.AddInventory.Search) : '';
        var domSearch = '';
        try {
            var el = document.getElementById('filtertxt');
            if (el && el.value != null) domSearch = String(el.value);
        } catch (e) { /* ignore */ }
        var search = modelSearch.trim();
        if (!search && domSearch.trim()) search = domSearch.trim();
        if (!$scope.AddInventory) $scope.AddInventory = {};
        $scope.AddInventory.Search = search;
        return search;
    }
    function fetchAllInventoryRowsForClientSearch() {
        var deferred = $q.defer();
        if (clientSearchCachePromise) {
            return clientSearchCachePromise;
        }
        if (Array.isArray(clientSearchAllRowsCache) && clientSearchAllRowsCache.length) {
            deferred.resolve(angular.copy(clientSearchAllRowsCache));
            return deferred.promise;
        }
        var allRows = [];
        var seen = {};
        function addUnique(rows) {
            angular.forEach(rows, function (r) {
                var key = '';
                if (r && r.AAT_ID !== undefined && r.AAT_ID !== null && String(r.AAT_ID) !== '') key = String(r.AAT_ID);
                else key = JSON.stringify(r || {});
                if (!seen[key]) {
                    seen[key] = true;
                    allRows.push(r);
                }
            });
        }
        AddAssetInventoryService.GetGridData({
            PageNumber: 1,
            PageSize: 5000,
            Search: '',
            SearchValue: ''
        }).then(function (resp) {
            var rows = (resp && resp.Table) ? resp.Table : [];
            if (angular.isArray(rows) && rows.length) addUnique(rows);
            clientSearchAllRowsCache = allRows;
            clientSearchCachePromise = null;
            deferred.resolve(angular.copy(allRows));
        }, function () {
            clientSearchAllRowsCache = allRows;
            clientSearchCachePromise = null;
            deferred.resolve(angular.copy(allRows));
        });
        clientSearchCachePromise = deferred.promise;
        return clientSearchCachePromise;
    }
    $scope.loadInventoryPage = function (pageNum) {
        if (pageNum < 1 || !$scope.gridOptions || !$scope.gridOptions.api) return;
        var pageSize = $scope.invPageSize;
        var searchText = '';
        var hasSearch = false;
        var effectivePageSize = pageSize;
        var effectivePageNum = pageNum;
        function bindRowsAndPaging(rawRows, usedPageNum) {
            var rows = Array.isArray(rawRows) ? rawRows : [];
            rows = applyClientSearch(rows, searchText);
            $scope.gridata = rows;
            if (!rows.length) {
                if (!hasSearch && usedPageNum > 1) {
                    $scope.invTotalPages = Math.max(1, usedPageNum - 1);
                    $scope.invCurrentPage = usedPageNum - 1;
                    progress(0, 'Loading...', false);
                    $scope.loadInventoryPage($scope.invCurrentPage);
                    return;
                }
                $scope.gridOptions.api.setRowData([]);
                $scope.griddata = [];
                $scope.invGridHasData = false;
                $scope.invTotalPages = 1;
                $scope.invCurrentPage = 1;
                progress(0, 'Loading...', false);
                return;
            }
            $scope.griddata = rows;
            $scope.gridOptions.api.setRowData(rows);
            $scope.invCurrentPage = hasSearch ? 1 : usedPageNum;
            $scope.invGridHasData = true;
            if (hasSearch) {
                $scope.invTotalPages = 1;
            } else if (rows.length < pageSize) {
                $scope.invTotalPages = Math.max(1, usedPageNum);
            } else {
                $scope.invTotalPages = Math.max(usedPageNum + 1, $scope.invTotalPages);
            }
            setTimeout(function () {
                progress(0, 'Loading...', false);
            }, 400);
        }
        function getRowsFromResponse(dataObj) {
            var rows = (dataObj && dataObj.Table) ? dataObj.Table : [];
            if (!angular.isArray(rows)) rows = [];
            return rows;
        }
        function fetchSearchFallbackRows(maxPages, pageSizeForFallback) {
            var deferred = $q.defer();
            var page = 1;
            var allRows = [];
            var seen = {};
            function pushUnique(rows) {
                angular.forEach(rows, function (r) {
                    var key = '';
                    if (r && r.AAT_ID !== undefined && r.AAT_ID !== null && String(r.AAT_ID) !== '') key = String(r.AAT_ID);
                    else key = JSON.stringify(r || {});
                    if (!seen[key]) {
                        seen[key] = true;
                        allRows.push(r);
                    }
                });
            }
            function next() {
                if (page > maxPages) {
                    deferred.resolve(allRows);
                    return;
                }
                AddAssetInventoryService.GetGridData({
                    PageNumber: page,
                    PageSize: pageSizeForFallback,
                    Search: '',
                    SearchValue: ''
                }).then(function (resp) {
                    var rows = getRowsFromResponse(resp);
                    if (!rows.length) {
                        deferred.resolve(allRows);
                        return;
                    }
                    pushUnique(rows);
                    if (rows.length < pageSizeForFallback) {
                        deferred.resolve(allRows);
                        return;
                    }
                    page += 1;
                    next();
                }, function () {
                    deferred.resolve(allRows);
                });
            }
            next();
            return deferred.promise;
        }
        progress(0, 'Loading...', true);
        AddAssetInventoryService.GetGridData({
            PageNumber: effectivePageNum,
            PageSize: effectivePageSize,
            Search: searchText || '',
            SearchValue: searchText || ''
        }).then(function (data) {
            var rows = getRowsFromResponse(data);
            if (hasSearch && rows.length === 0) {
                AddAssetInventoryService.GetGridData({
                    PageNumber: 1,
                    PageSize: 5000,
                    Search: '',
                    SearchValue: ''
                }).then(function (fallbackData) {
                    var fallbackRows = getRowsFromResponse(fallbackData);
                    bindRowsAndPaging(fallbackRows, effectivePageNum);
                }, function () {
                    progress(0, 'Loading...', false);
                });
                return;
            }
            if (hasSearch && applyClientSearch(rows, searchText).length === 0) {
                fetchSearchFallbackRows(20, 200).then(function (fallbackRows) {
                    bindRowsAndPaging(fallbackRows, 1);
                }, function () {
                    bindRowsAndPaging(rows, effectivePageNum);
                });
                return;
            }
            bindRowsAndPaging(rows, effectivePageNum);
        }, function () {
            progress(0, 'Loading...', false);
        });
    };
    $scope.loadMainGridFromServer = function (retryCount) {
        retryCount = retryCount || 0;
        if (!$scope.gridOptions.api) {
            if (retryCount < 20) {
                $timeout(function () {
                    $scope.loadMainGridFromServer(retryCount + 1);
                }, 100);
            }
            return;
        }
        if (typeof $scope.gridOptions.api.setQuickFilter === 'function') {
            $scope.gridOptions.api.setQuickFilter('');
        }
        clientSearchAllRowsCache = null;
        clientSearchCachePromise = null;
        $scope.invTotalPages = 1;
        $scope.loadInventoryPage(1);
        $timeout(function () {
            fetchAllInventoryRowsForClientSearch();
        }, 0);
    };
    $scope.Bindgrid = function () {
        var searchText = normalizedSearchText();
        if (!$scope.gridOptions || !$scope.gridOptions.api) return;
        if (!searchText) {
            if (typeof $scope.gridOptions.api.setQuickFilter === 'function') {
                $scope.gridOptions.api.setQuickFilter('');
            }
            if (Array.isArray($scope.griddata) && $scope.griddata.length) {
                $scope.gridOptions.api.setRowData($scope.griddata);
                $scope.invGridHasData = true;
                $scope.invCurrentPage = 1;
                $scope.invTotalPages = 1;
            } else {
                $scope.loadMainGridFromServer();
            }
            return;
        }
        // Immediate local filter on currently visible rows for fast UX.
        if (typeof $scope.gridOptions.api.setQuickFilter === 'function') {
            $scope.gridOptions.api.setQuickFilter(searchText || '');
        }
        // Upgrade to full-data filter once background cache is ready.
        fetchAllInventoryRowsForClientSearch().then(function (allRows) {
            if (normalizedSearchText() !== searchText) return;
            var filteredRows = applyClientSearch(allRows, searchText);
            if (typeof $scope.gridOptions.api.setQuickFilter === 'function') {
                $scope.gridOptions.api.setQuickFilter('');
            }
            $scope.gridOptions.api.setRowData(filteredRows);
            $scope.griddata = filteredRows;
            $scope.invGridHasData = filteredRows.length > 0;
            $scope.invCurrentPage = 1;
            $scope.invTotalPages = 1;
        });
    };
    $scope.onSearchKeydown = function ($event) {
        var code = $event.keyCode != null ? $event.keyCode : $event.which;
        if (code !== 13) return;
        $event.preventDefault();
        $event.stopPropagation();
        $scope.Bindgrid();
    };
    $scope.Pageload = function () {

        $scope.modify = true;
        $scope.save = false;
        $scope.griddata1 = true;

        /* Tenant-specific: SubcategoryAssetIdEnabled = GET_SYSTEM_PREFERENCE_ADM row ASSET_AAT_CODE_BY_SUBCAT (SYSP_STA_ID=1, SYSP_VAL1 truthy; SYSP_VAL2 CANARABANK disables). */
        AddAssetInventoryService.GetSubcategoryAssetIdEnabled().then(function (r) {
            $scope.useSubcategoryAssetCodePref = !!(r && (r.Enabled === true || r.enabled === true || r.Enabled === 1 || r.enabled === 1
                || String(r.Enabled).toLowerCase() === 'true' || String(r.enabled).toLowerCase() === 'true'));
            $scope.sysPrefAssetSubcatLoaded = true;
            $scope.aatNameNgPattern = ($scope.useSubcategoryAssetCodePref) ? /^[\s\S]{0,500}$/ : /^[A-Za-z0-9 /]+$/;
            $timeout(function () {
                if (!$scope.AAT_ID && !$scope.save && typeof $scope.GetAssetLabel === 'function') {
                    $scope.GetAssetLabel();
                }
            }, 0);
        }, function () {
            $scope.useSubcategoryAssetCodePref = false;
            $scope.sysPrefAssetSubcatLoaded = true;
            $scope.aatNameNgPattern = /^[A-Za-z0-9 /]+$/;
        });

        AddAssetInventoryService.GetAssetMainCategory().then(function (Zdata) {
            $scope.AssetMainCategoryList = Zdata;
            AddAssetInventoryService.GetAssetSubCategory().then(function (Vdata) {
                $scope.AssetSubCategoryListS = Vdata;
                //$scope.AssetSubCategoryList = $scope.AssetSubCategoryListS;
                AddAssetInventoryService.GetAssetBrand().then(function (Adata) {
                    $scope.AssetBrandLists = Adata;
                    //$scope.AssetBrandList = $scope.AssetBrandLists;
                    AddAssetInventoryService.GetAssetModel().then(function (Mdata) {
                        $scope.AssetModelLists = Mdata;
                        //$scope.AssetModelList = $scope.AssetModelLists;
                    }, function (error) {
                        console.error('Error fetching Asset Model:', error);
                    });

                }, function (error) {
                    console.error('Error fetching AssetSubCategory:', error);
                });
            }, function (error) {
                console.error('Error fetching AssetSubCategory:', error);
            });
        }, function (error) {
            console.error('Error fetching AssetMainCategory:', error);
        });

        AddAssetInventoryService.GetAssetlOCATION().then(function (Ldata) {

            $scope.AssetlOCATIONList = Ldata;
            AddAssetInventoryService.GetAssettower().then(function (tdata) {
                $scope.AssetTowerLists = tdata;

                AddAssetInventoryService.GetAssetfloor().then(function (fdata) {

                    $scope.AssetFloorLists = fdata;

                }, function (error) {
                    console.error('Error fetching AssetSubCategory:', error);
                });
            }, function (error) {
                console.error('Error fetching AssetSubCategory:', error);
            });
        }, function (error) {
            console.error('Error fetching AssetSubCategory:', error);
        });


        AddAssetInventoryService.GetCC().then(function (cdata) {

            $scope.CostcenterList = cdata;
        }, function (error) {
            console.error('Error fetching Costcenter:', error);
        });
        AddAssetInventoryService.GetAssetVENDOR().then(function (Vendata) {
            $scope.AssetVENDORList = Vendata;
        }, function (error) {
            console.error('Error fetching AssetSubCategory:', error);
        });
        AddAssetInventoryService.GetAssetTYPE().then(function (Adata) {
            $scope.AssetTYPEList = Adata;
        }, function (error) {
            console.error('Error fetching AssetSubCategory:', error);
        });

        $scope.loadMainGridFromServer();

        AddAssetInventoryService.BindCompany().then(function (Adata) {
            $scope.AssetCompanyList = Adata;
            $scope.AssetCompanyList[0].ticked = true;
            $scope.AssetCompanyList.AssettCompany = $scope.AssetCompanyList[0];
        }, function (error) {
            console.error('Error fetching AssetSubCategory:', error);
        });

    };

    $scope.onBindSubcategory = function () {
        $scope.AssetSubCategoryList = [];
        //$scope.AssetSubCategoryList = $filter('filter')($scope.AssetSubCategoryListS, { Assetmaincatcode: $scope.AssetMainCategoryList.Assetmaincatcode[0].Assetmaincatcode });
        $scope.AssetSubCategoryListS.forEach(function (value) {
            if (value.Assetmaincatcode == $scope.AssetMainCategoryList.Assetmaincatcode[0].Assetmaincatcode)
                $scope.AssetSubCategoryList.push(value)
        })
        /* Do not call GetAssetLabel here: this runs on category click (filter subs). Asset ID from subcategory
           is fetched after the user selects Subcategory — see onBindAssetBrand (matches legacy flow). */
    }
    $scope.onBindAssetBrand = function () {
        angular.forEach($scope.AssetMainCategoryList, function (Zdata) {
            Zdata.ticked = false;
        });
        $scope.AssetMainCategoryList.Assetmaincatcode = [];
        angular.forEach($scope.AssetMainCategoryList, function (value, key) {
            var cat = $scope.AssetSubCategoryList.Assetsubncatcode[0].Assetmaincatcode;
            if (cat != undefined && value.Assetmaincatcode == cat) {
                value.ticked = true;
                $scope.AssetMainCategoryList.Assetmaincatcode.push(value);
            }
        });

        $scope.AssetBrandList = [];
        $scope.AssetBrandLists.forEach(function (value) {
            if (value.Assetsubncatcode == $scope.AssetSubCategoryList.Assetsubncatcode[0].Assetsubncatcode && value.Assetcatcode == $scope.AssetSubCategoryList.Assetsubncatcode[0].Assetmaincatcode)
                $scope.AssetBrandList.push(value)
        })

        if (!$scope.AAT_ID && !$scope.save && $scope.sysPrefAssetSubcatLoaded && typeof $scope.GetAssetLabel === 'function') {
            $scope.GetAssetLabel();
        }

        //$scope.AssetBrandList = $filter('filter')($scope.AssetBrandLists, { Assetsubncatcode: $scope.AssetSubCategoryList.Assetsubncatcode[0].Assetsubncatcode, Assetcatcode: $scope.AssetSubCategoryList.Assetsubncatcode[0].Assetmaincatcode });
    }
    $scope.onBindAssetModel = function () {
        angular.forEach($scope.AssetMainCategoryList, function (Zdata) {
            Zdata.ticked = false;
        });
        angular.forEach($scope.AssetSubCategoryList, function (Vdata) {
            Vdata.ticked = false;
        });
        $scope.AssetMainCategoryList.Assetmaincatcode = [];
        $scope.AssetSubCategoryList.Assetsubncatcode = [];

        angular.forEach($scope.AssetMainCategoryList, function (value, key) {
            var cate = $scope.AssetBrandList.BrandCode[0].Assetcatcode;
            if (cate != undefined && value.Assetmaincatcode == cate) {
                value.ticked = true;
                $scope.AssetMainCategoryList.Assetmaincatcode.push(value);
            }
        });
        angular.forEach($scope.AssetSubCategoryList, function (value, key) {
            var subcat = $scope.AssetBrandList.BrandCode[0].Assetsubncatcode;
            var cate = $scope.AssetBrandList.BrandCode[0].Assetcatcode;
            if (subcat != undefined && value.Assetsubncatcode == subcat && cate != undefined && value.Assetmaincatcode == cate) {
                value.ticked = true;
                $scope.AssetSubCategoryList.Assetsubncatcode.push(value);
            }
        });
        $scope.AssetModelList = [];
        $scope.AssetModelLists.forEach(function (value) {
            if (value.MdBrandCode == $scope.AssetBrandList.BrandCode[0].BrandCode && value.Mdsubncatcode == $scope.AssetBrandList.BrandCode[0].Assetsubncatcode && value.Mdcatcode == $scope.AssetBrandList.BrandCode[0].Assetcatcode)
                $scope.AssetModelList.push(value)
        })

        //$scope.AssetModelList = $filter('filter')($scope.AssetModelLists, { MdBrandCode: $scope.AssetBrandList.BrandCode[0].BrandCode, Mdsubncatcode: $scope.AssetBrandList.BrandCode[0].Assetsubncatcode, Mdcatcode: $scope.AssetBrandList.BrandCode[0].Assetcatcode });

    }

    $scope.AstMdlchanged = function () {
        angular.forEach($scope.AssetMainCategoryList, function (Zdata) {
            Zdata.ticked = false;
        });
        angular.forEach($scope.AssetSubCategoryList, function (Vdata) {
            Vdata.ticked = false;
        });
        angular.forEach($scope.AssetBrandList, function (Adata) {
            Adata.ticked = false;
        });
        $scope.AssetMainCategoryList.Assetmaincatcode = [];
        $scope.AssetSubCategoryList.Assetsubncatcode = [];
        $scope.AssetBrandList.BrandCode = [];


        angular.forEach($scope.AssetMainCategoryList, function (value, key) {
            var cate = $scope.AssetModelList.MdCode[0].Mdcatcode;
            if (cate != undefined && value.Assetmaincatcode == cate) {
                value.ticked = true;
                $scope.AssetMainCategoryList.Assetmaincatcode.push(value);
            }
        });
        angular.forEach($scope.AssetSubCategoryList, function (value, key) {
            var subcat = $scope.AssetModelList.MdCode[0].Mdsubncatcode;
            var cate = $scope.AssetModelList.MdCode[0].Mdcatcode;
            if (subcat != undefined && value.Assetsubncatcode == subcat && cate != undefined && value.Assetmaincatcode == cate) {
                value.ticked = true;
                $scope.AssetSubCategoryList.Assetsubncatcode.push(value);
            }
        });
        angular.forEach($scope.AssetBrandList, function (value, key) {
            var brnd = $scope.AssetModelList.MdCode[0].MdBrandCode;
            if (brnd != undefined && value.BrandCode == brnd) {
                value.ticked = true;
                $scope.AssetBrandList.BrandCode.push(value);
            }
        });

        if (!$scope.AAT_ID && !$scope.save && $scope.sysPrefAssetSubcatLoaded && typeof $scope.GetAssetLabel === 'function') {
            $scope.GetAssetLabel();
        }

    }

    var employeeLoadKey = '';
    var employeeRows = [];
    var employeeSearchKey = '';
    var spaceLoadKey = '';
    var spaceRows = [];
    var spaceSearchKey = '';
    var dropdownWindow = 40;
    function resetAssetSpaceList() {
        spaceLoadKey = '';
        spaceRows = [];
        spaceSearchKey = '';
        $scope.AssetSpaceList = [];
    }
    function resetAssetEmployeeList() {
        employeeLoadKey = '';
        employeeRows = [];
        employeeSearchKey = '';
        $scope.AssetEmployeeList = [];
    }
    function employeeLabel(id, name) {
        id = String(id || '').trim();
        name = String(name || '').trim();
        if (!id) return name;
        if (!name || name === id) return id;
        return id + '/' + name;
    }
    function mapEmployeeRow(r) {
        var id = '';
        var name = '';
        if (r && typeof r === 'object') {
            id = r.AUR_ID || r.aur_ID || r.aur_id || '';
            name = r.AUR_KNOWN_AS || r.aur_KNOWN_AS || r.aur_known_as || '';
        }
        id = String(id).trim();
        name = String(name).trim();
        return { AUR_ID: id, AUR_KNOWN_AS: name, EMP_LABEL: employeeLabel(id, name), ticked: false };
    }
    function mapSpaceRow(r) {
        var id = '';
        if (r && typeof r === 'object') id = r.SPC_ID || r.spc_ID || r.sPC_ID || r.spc_id || '';
        else if (r != null) id = r;
        return { SPC_ID: String(id).trim(), ticked: false };
    }
    function visibleRows(rows, keyword, textOf, selectedId, idOf) {
        var q = (keyword || '').toLowerCase();
        var list = [];
        var selected = null;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var id = idOf(row);
            if (selectedId && id === selectedId) selected = row;
            if (list.length >= dropdownWindow) continue;
            if (!q || textOf(row).toLowerCase().indexOf(q) >= 0) list.push(row);
        }
        if (selected) {
            var already = false;
            for (var j = 0; j < list.length; j++) {
                if (idOf(list[j]) === selectedId) { already = true; break; }
            }
            if (!already) list.unshift(selected);
        }
        return list;
    }
    function publishEmployeeList(keyword) {
        var selectedId = '';
        angular.forEach($scope.AssetEmployeeList, function (r) {
            if (r && r.ticked) selectedId = r.AUR_ID;
        });
        var list = visibleRows(employeeRows, keyword, function (r) {
            return r.EMP_LABEL || employeeLabel(r.AUR_ID, r.AUR_KNOWN_AS);
        }, selectedId, function (r) { return r.AUR_ID; });
        $scope.AssetEmployeeList = list.map(function (r) {
            return { AUR_ID: r.AUR_ID, AUR_KNOWN_AS: r.AUR_KNOWN_AS, EMP_LABEL: r.EMP_LABEL || employeeLabel(r.AUR_ID, r.AUR_KNOWN_AS), ticked: r.AUR_ID === selectedId };
        });
    }
    function publishSpaceList(keyword) {
        var selectedId = '';
        angular.forEach($scope.AssetSpaceList, function (r) {
            if (r && r.ticked) selectedId = r.SPC_ID;
        });
        var list = visibleRows(spaceRows, keyword, function (r) { return r.SPC_ID || ''; }, selectedId, function (r) { return r.SPC_ID; });
        $scope.AssetSpaceList = list.map(function (r) {
            return { SPC_ID: r.SPC_ID, ticked: r.SPC_ID === selectedId };
        });
    }
    $scope.onEmployeeSearch = function (data) {
        if (employeeRows.length <= dropdownWindow) return;
        var keyword = data && data.keyword ? String(data.keyword) : '';
        if (keyword === employeeSearchKey) return;
        employeeSearchKey = keyword;
        publishEmployeeList(keyword);
    };
    $scope.onSpaceSearch = function (data) {
        if (spaceRows.length <= dropdownWindow) return;
        var keyword = data && data.keyword ? String(data.keyword) : '';
        if (keyword === spaceSearchKey) return;
        spaceSearchKey = keyword;
        publishSpaceList(keyword);
    };
    $scope.onBindAssetEmployee = function () {
        var loc = $scope.AssetlOCATIONList && $scope.AssetlOCATIONList.lCMCODE && $scope.AssetlOCATIONList.lCMCODE[0];
        var lcmCode = resolveLocationCodeFromItem(loc);
        if (!lcmCode) {
            resetAssetEmployeeList();
            return;
        }
        if (employeeLoadKey === lcmCode) return;
        employeeLoadKey = lcmCode;
        AddAssetInventoryService.GetAssetEmployee(lcmCode).then(function (data) {
            if (employeeLoadKey !== lcmCode) return;
            var rows = Array.isArray(data) ? data : [];
            employeeRows = rows.map(mapEmployeeRow).filter(function (r) { return r.AUR_ID; });
            employeeSearchKey = '';
            publishEmployeeList('');
        }, function () {
            if (employeeLoadKey === lcmCode) resetAssetEmployeeList();
        });
    };
    function selectedCode(item, keys) {
        if (!item || typeof item !== 'object') return '';
        for (var i = 0; i < keys.length; i++) {
            if (item[keys[i]] != null && String(item[keys[i]]).trim() !== '') return String(item[keys[i]]).trim();
        }
        return '';
    }
    $scope.onBindAssetSpace = function () {
        var loc = $scope.AssetlOCATIONList && $scope.AssetlOCATIONList.lCMCODE && $scope.AssetlOCATIONList.lCMCODE[0];
        var twr = $scope.AssetTowerList && $scope.AssetTowerList.twr_CODE && $scope.AssetTowerList.twr_CODE[0];
        var flr = $scope.AssetFloorList && $scope.AssetFloorList.flr_code && $scope.AssetFloorList.flr_code[0];
        var lcmCode = selectedCode(loc, ['lCMCODE', 'LCM_CODE', 'LCMCODE']);
        var twrCode = selectedCode(twr, ['twr_CODE', 'twr_code', 'TWR_CODE']);
        var flrCode = selectedCode(flr, ['flr_code', 'FLR_CODE', 'flr_CODE']);
        if (!lcmCode || !twrCode || !flrCode) {
            resetAssetSpaceList();
            return;
        }
        var key = lcmCode + '|' + twrCode + '|' + flrCode;
        if (spaceLoadKey === key) return;
        spaceLoadKey = key;
        AddAssetInventoryService.GetAssetSpace(lcmCode, twrCode, flrCode).then(function (data) {
            if (spaceLoadKey !== key) return;
            var rows = Array.isArray(data) ? data : [];
            spaceRows = rows.map(mapSpaceRow).filter(function (r) { return r.SPC_ID; });
            spaceSearchKey = '';
            publishSpaceList('');
        }, function () {
            if (spaceLoadKey === key) resetAssetSpaceList();
        });
    };
    $scope.onBindAssettower = function () {
        $timeout(function () {
            resetAssetSpaceList();
            $scope.onBindAssetEmployee();
        }, 0);
        $scope.AssetTowerList = [];
        $scope.AssetTowerLists.forEach(function (value) {
            if (value.lCMCODE == $scope.AssetlOCATIONList.lCMCODE[0].lCMCODE)
                $scope.AssetTowerList.push(value)
        })

        if (!$scope.AAT_ID && !$scope.save && $scope.sysPrefAssetSubcatLoaded && typeof $scope.GetAssetLabel === 'function') {
            $scope.GetAssetLabel();
        }

        //$scope.AssetTowerList = $filter('filter')($scope.AssetTowerLists, { lCMCODE: $scope.AssetlOCATIONList.lCMCODE[0].lCMCODE });

    }
    $scope.onBindAssetFLOOR = function () {
        $timeout(function () {
            resetAssetSpaceList();
        }, 0);
        angular.forEach($scope.AssetlOCATIONList, function (Ldata) {
            Ldata.ticked = false;
        });
        $scope.AssetlOCATIONList.lCMCODE = [];
        angular.forEach($scope.AssetlOCATIONList, function (value, key) {
            var cate = $scope.AssetTowerList.twr_CODE[0].lCMCODE;
            if (cate != undefined && value.lCMCODE == cate) {
                value.ticked = true;
                $scope.AssetlOCATIONList.lCMCODE.push(value);
            }
        });

        $scope.AssetFloorList = [];
        $scope.AssetFloorLists.forEach(function (value) {
            if (value.lCM_CODE == $scope.AssetTowerList.twr_CODE[0].lCMCODE && value.twr_CODE == $scope.AssetTowerList.twr_CODE[0].twr_CODE)
                $scope.AssetFloorList.push(value)
        })


        //$scope.AssetFloorList = $filter('filter')($scope.AssetFloorLists, { lCM_CODE: $scope.AssetTowerList.twr_CODE[0].lCMCODE,twr_CODE: $scope.AssetTowerList.twr_CODE[0].twr_CODE });

        if (!$scope.AAT_ID && !$scope.save && $scope.sysPrefAssetSubcatLoaded && typeof $scope.GetAssetLabel === 'function') {
            $scope.GetAssetLabel();
        }

    }

    $scope.onFlrChanged = function () {
        angular.forEach($scope.AssetlOCATIONList, function (Ldata) {
            Ldata.ticked = false;
        });

        angular.forEach($scope.AssetTowerList, function (tdata) {
            tdata.ticked = false;
        });

        $scope.AssetlOCATIONList.lCMCODE = [];
        $scope.AssetTowerList.twr_CODE = [];
        angular.forEach($scope.AssetlOCATIONList, function (value, key) {
            var lcm = $scope.AssetFloorList.flr_code[0].lCM_CODE;
            if (lcm != undefined && value.lCMCODE == lcm) {
                value.ticked = true;
                $scope.AssetlOCATIONList.lCMCODE.push(value);
            }
        });

        angular.forEach($scope.AssetTowerList, function (value, key) {
            var twr = $scope.AssetFloorList.flr_code[0].twr_CODE;
            if (twr != undefined && value.twr_CODE == twr) {
                value.ticked = true;
                $scope.AssetTowerList.twr_CODE.push(value);
            }
        });

        if (!$scope.AAT_ID && !$scope.save && $scope.sysPrefAssetSubcatLoaded && typeof $scope.GetAssetLabel === 'function') {
            $scope.GetAssetLabel();
        }
        $timeout(function () {
            $scope.onBindAssetSpace();
        }, 0);

    }




    var columnDefs = [

        { headerName: "Serial No", field: "AAT_ID", cellClass: 'grid-align' },
        { headerName: "Asset Name", field: "AAT_NAME", cellClass: 'grid-align' },
        { headerName: "Location", field: "AST_LOC", cellClass: 'grid-align' },
        { headerName: "Category", field: "AST_CAT", cellClass: 'grid-align' },
        { headerName: "Subcategory", field: "AST_SUB_CAT", cellClass: 'grid-align' },
        { headerName: "Brand", field: "AST_BRD", cellClass: 'grid-align' },
        { headerName: "Model Name", field: "AST_MODEL_NAME", cellClass: 'grid-align' },
        { headerName: "Asset Cost", field: "AAT_COST", cellClass: 'grid-align' },
        { headerName: "Added By", field: "AUR_KNOWN_AS", cellClass: 'grid-align' },

        { headerName: "Edit", template: '<div class="edit-cell-hitarea" ng-click="EditFunction(data)"><i class="fa fa-pencil fa-fw"></i></div>', cellClass: 'grid-align edit-action-cell', suppressMenu: true }
        //{
        //    headerName: "Edit",
        //    field: "__edit__",
        //    width: 90,
        //    suppressMenu: true,
        //    suppressFilter: true,
        //    sortable: false,
        //    cellClass: 'grid-align',
        //    cellRenderer: function () { return '<a href="javascript:void(0)" title="Edit"><i class="fa fa-pencil"></i></a>'; },
        //    onCellClicked: function (params) {
        //        if (!params || !params.data) return;
        //        $scope.$applyAsync(function () { $scope.EditFunction(params.data); });
        //    }
        //}

    ];


    var columnDef = [
        { headerName: "Remarks", field: "Remarks", cellClass: 'grid-align' },
        { headerName: "Asset SNO", field: "AssetSNO", cellClass: 'grid-align' },
        { headerName: "Asset Vendor", field: "AssetVendor", cellClass: 'grid-align' },
        { headerName: "Category", field: "AssetCategory", cellClass: 'grid-align' },
        { headerName: "SubCategory", field: "AssetSubCategory", cellClass: 'grid-align' },
        { headerName: "Brand", field: "AssetBrand", cellClass: 'grid-align' },
        { headerName: "Model", field: "AssetModel", cellClass: 'grid-align' },
        { headerName: "Location", field: "AssetLocation", cellClass: 'grid-align' },
        { headerName: "Tower", field: "Tower", cellClass: 'grid-align' },
        { headerName: "Floor", field: "Floor", cellClass: 'grid-align' },
        { headerName: "Purchased Date", field: "PurchaseDate", cellClass: 'grid-align' },
        { headerName: "Invoice Number", field: "InvoiceNumber", cellClass: 'grid-align' },
        { headerName: "Invoice Date", field: "InvoiceDate", cellClass: 'grid-align' },
        { headerName: "Warranty Date", field: "WarrantyDate", cellClass: 'grid-align' },
        { headerName: "PO Number", field: "PONumber", cellClass: 'grid-align' },
        { headerName: "Asset Cost", field: "AssetCost", cellClass: 'grid-align' },
        { headerName: "Serial No", field: "AAT_Serial_No", cellClass: 'grid-align' },
        { headerName: "Description", field: "AssetDescription", cellClass: 'grid-align' }

    ];

    $scope.gridOptions1 = {
        columnDefs: columnDef,
        rowData: null,
        enableColResize: true,
        enableSorting: true,
        cellClass: 'grid-align',
        angularCompileRows: true,
        enableCellSelection: false,
        suppressHorizontalScroll: false,
        defaultColDef: {
            width: 150,
            resizable: true,
            sortable: true,
            filter: true
        },
        enableFilter: true,

        onGridReady: function () {
            $scope.gridOptions1.api.sizeColumnsToFit()
        }
    };
    function onFilterChanged(value) {
        $scope.gridOptions1.api.setQuickFilter(value);
    }


    var columnDef4 = [
        { headerName: "Spare Part ID ", field: "SparePartID", cellClass: 'grid-align' },
        { headerName: "Spare Part Name", field: "SparePartName", cellClass: 'grid-align' },
        { headerName: "Quantity", field: "Quantity", cellClass: 'grid-align' },
        { headerName: "Cost", field: "Cost", cellClass: 'grid-align' },
        { headerName: "Total Cost", field: "TotalCost", cellClass: 'grid-align' },
        { headerName: "Remove", template: '<a ng-click="Remove(data)"> <span class="glyphicon glyphicon-remove-circle"></span></a>', cellClass: 'grid-align', width: 150 }

    ];
    $scope.gridOptions4 = {
        columnDefs: columnDef4,
        rowData: null,
        enableColResize: true,
        enableSorting: true,
        cellClass: 'grid-align',
        angularCompileRows: true,
        enableCellSelection: false,
        suppressHorizontalScroll: false,

        enableFilter: true,

        onReady: function () {
            $scope.gridOptions4.api.sizeColumnsToFit()
        }
    };
    function onFilterChanged(value) {
        $scope.gridOptions4.api.setQuickFilter(value);
    }




    /** Resolves AAT_NAME (when tenant pref on) via GetNextAssetCodeBySubCategory; AAT_CODE via GetAstLabel when hierarchy + location are set. */
    $scope.GetAssetLabel = function () {
        try {
            if ($scope.AAT_ID) return;
            if (!$scope.sysPrefAssetSubcatLoaded) return;

            if ($scope.useSubcategoryAssetCodePref && $scope.AssetSubCategoryList && $scope.AssetSubCategoryList.Assetsubncatcode && $scope.AssetSubCategoryList.Assetsubncatcode.length) {
                var subRow = $scope.AssetSubCategoryList.Assetsubncatcode[0];
                var subCode = (subRow && subRow.Assetsubncatcode != null) ? subRow.Assetsubncatcode : subRow;
                if (subCode !== undefined && subCode !== null && String(subCode).trim() !== '') {
                    AddAssetInventoryService.GetNextAssetCodeBySubCategory({ AST_SUB_CAT: subCode }).then(function (response) {
                        var next = '';
                        if (response) {
                            next = response.NextCode != null ? String(response.NextCode).trim() : (response.nextCode != null ? String(response.nextCode).trim() : '');
                            if (!next && (response.Message || response.message)) {
                                console.warn('GetNextAssetCodeBySubCategory:', response.Message || response.message);
                            }
                        }
                        $scope.$applyAsync(function () {
                            if (!$scope.AddInventory) $scope.AddInventory = {};
                            $scope.AddInventory.AAT_NAME = next || '';
                        });
                    }, function () {
                        $scope.$applyAsync(function () {
                            if (!$scope.AddInventory) $scope.AddInventory = {};
                            $scope.AddInventory.AAT_NAME = '';
                        });
                    });
                }
            }

            if (!$scope.AssetMainCategoryList || !$scope.AssetMainCategoryList.Assetmaincatcode || !$scope.AssetMainCategoryList.Assetmaincatcode.length) return;
            if (!$scope.AssetSubCategoryList || !$scope.AssetSubCategoryList.Assetsubncatcode || !$scope.AssetSubCategoryList.Assetsubncatcode.length) return;
            if (!$scope.AssetBrandList || !$scope.AssetBrandList.BrandCode || !$scope.AssetBrandList.BrandCode.length) return;
            if (!$scope.AssetlOCATIONList || !$scope.AssetlOCATIONList.lCMCODE || !$scope.AssetlOCATIONList.lCMCODE.length) return;
            var modelRow = resolveModelForAssetLabel($scope.AssetModelList);
            if (!modelRow) return;

            var locItem = $scope.AssetlOCATIONList.lCMCODE[0];
            var astLoc = resolveLocationCodeFromItem(locItem);
            if (!astLoc) return;

            var obj = {
                AST_CAT: $scope.AssetMainCategoryList.Assetmaincatcode[0].Assetmaincatcode,
                AST_SUB_CAT: $scope.AssetSubCategoryList.Assetsubncatcode[0].Assetsubncatcode,
                AST_BRD: $scope.AssetBrandList.BrandCode[0].BrandCode,
                AST_MODEL: modelRow.MdCode,
                AST_MODEL_NAME: modelRow.MdName,
                AST_LOC: astLoc
            };
            AddAssetInventoryService.GetAstLabel(obj).then(function (response) {
                var code = '';
                if (response && response.Table && response.Table[0]) {
                    var row = response.Table[0];
                    if (row.AAT_CODE != null && String(row.AAT_CODE).trim() !== '') code = String(row.AAT_CODE).trim();
                    else if (row.AAT_NAME != null && String(row.AAT_NAME).trim() !== '') code = String(row.AAT_NAME).trim();
                    else if (row.aat_CODE != null && String(row.aat_CODE).trim() !== '') code = String(row.aat_CODE).trim();
                    else if (row.aat_NAME != null && String(row.aat_NAME).trim() !== '') code = String(row.aat_NAME).trim();
                }
                if (!code) code = firstGeneratedAssetCodeFromLabelApi(response);
                if (code) {
                    $scope.$applyAsync(function () {
                        if (!$scope.AddInventory) $scope.AddInventory = {};
                        $scope.AddInventory.AAT_CODE = code;
                    });
                }
            }, function () {
                $scope.$applyAsync(function () {
                    if ($scope.AddInventory) $scope.AddInventory.AAT_CODE = '';
                });
                if (typeof showNotification === 'function') {
                    showNotification('error', 8, 'top-right', 'Could not generate Asset ID. Please try again or contact support.');
                }
            });
        } catch (e) {
            return;
        }
    };
    $scope.disabled = false;
    $scope.EditFunction = function (data) {
        $scope.save = true;
        $scope.modify = false;

        $scope.griddata1 = true;
        $scope.clear();
        $scope.AAT_ID = rowAstId(data);
        var obj = {
            AAT_ID: $scope.AAT_ID
        }
        $scope.EnableStatus = 0;
        $scope.AssetSubCategoryList = $scope.AssetSubCategoryListS;
        $scope.AssetBrandList = $scope.AssetBrandLists;
        $scope.AssetModelList = $scope.AssetModelLists;
        $scope.AssetTowerList = $scope.AssetTowerLists;
        $scope.AssetFloorList = $scope.AssetFloorLists;
        AddAssetInventoryService.GetDetailsbyID(obj).then(function (response) {
            var rows = apiDataRows(response);
            if (!rows.length && response && response.Table && Array.isArray(response.Table)) rows = response.Table;
            if (!rows.length && Array.isArray(response)) rows = response;
            var row = rows.length ? rows[0] : null;
            if (!row) {
                showNotification('error', 8, 'top-right', 'Unable to load asset details for edit.');
                return;
            }
            $scope.AddInventory = $scope.AddInventory || {};

            var catItem = tickSingleByCode($scope.AssetMainCategoryList, 'Assetmaincatcode', row.AAT_AAG_CODE);
            var subItem = tickSingleByCode($scope.AssetSubCategoryList, 'Assetsubncatcode', row.AAT_SUB_CODE);
            var brandItem = tickSingleByCode($scope.AssetBrandList, 'BrandCode', row.AAT_AAB_CODE);
            var modelItem = tickSingleByCode($scope.AssetModelList, 'MdCode', row.AAT_MODEL_NAME);
            var locItem = tickSingleByCode($scope.AssetlOCATIONList, 'lCMCODE', row.AAT_LOC_ID);
            var towerItem = tickSingleByCode($scope.AssetTowerList, 'twr_CODE', row.AAT_TOWER_CODE);
            var floorItem = tickSingleByCode($scope.AssetFloorList, 'flr_code', row.AAT_FLOOR_CODE);
            var vendorItem = tickSingleByCode($scope.AssetVENDORList, 'vendorCode', row.AAT_AVR_CODE);
            var ccItem = tickSingleByCode($scope.CostcenterList, 'Cost_Center_Code', row.AAT_LOB);
            var typeItem = tickSingleByCode($scope.AssetTYPEList, 'Assettype', row.AAT_AST_STATUS);
            // Company may arrive as id/code/name depending on stored procedure serialization.
            var companyFromRow = row.AAT_COM_ID || row.AAT_COM || row.AAT_COMPANY || row.COMPANYID
                || row.CNP_ID || row.cnp_ID || row.cNP_ID;
            var companyNameFromRow = row.CNP_NAME || row.cnp_NAME || row.CompanyName || row.COMPANYNAME
                || row.COMPANY_NAME || row.AAT_COMPANY_NAME || row.AAT_COMPANY || row.AST_COMPANY;
            var companyItem = null;
            angular.forEach($scope.AssetCompanyList, function (c) {
                if (c && typeof c === 'object') c.ticked = false;
            });
            if (companyFromRow !== undefined && companyFromRow !== null && String(companyFromRow).trim() !== '') {
                companyItem = tickSingleByAny($scope.AssetCompanyList, ['AssettCompany', 'CNP_ID', 'companyId', 'CompanyId', 'Id', 'id'], companyFromRow);
            }
            if (!companyItem && companyNameFromRow !== undefined && companyNameFromRow !== null && String(companyNameFromRow).trim() !== '') {
                companyItem = tickSingleByAny($scope.AssetCompanyList, ['AssettCompany', 'CNP_NAME', 'CompanyName', 'COMPANY_NAME', 'Name', 'name'], companyNameFromRow);
            }
            // If there is only one company configured for tenant, auto-select it in edit mode.
            if (!companyItem && Array.isArray($scope.AssetCompanyList) && $scope.AssetCompanyList.length === 1) {
                $scope.AssetCompanyList[0].ticked = true;
                companyItem = $scope.AssetCompanyList[0];
            }

            $scope.AssetMainCategoryList.Assetmaincatcode = catItem ? [catItem] : [];
            $scope.AssetSubCategoryList.Assetsubncatcode = subItem ? [subItem] : [];
            $scope.AssetBrandList.BrandCode = brandItem ? [brandItem] : [];
            $scope.AssetModelList.MdCode = modelItem ? [modelItem] : [];
            $scope.AssetlOCATIONList.lCMCODE = locItem ? [locItem] : [];
            $scope.AssetTowerList.twr_CODE = towerItem ? [towerItem] : [];
            $scope.AssetFloorList.flr_code = floorItem ? [floorItem] : [];
            $scope.onBindAssetSpace();
            $scope.onBindAssetEmployee();
            $scope.AssetVENDORList.vendorCode = vendorItem ? [vendorItem] : [];
            $scope.CostcenterList.Cost_Center_Code = ccItem ? [ccItem] : [];
            $scope.AssetTYPEList.Assettype = typeItem ? [typeItem] : [];

            $scope.AddInventory.AAT_CODE = row.AAT_CODE;
            $scope.AddInventory.AAT_NAME = row.AAT_NAME;
            $scope.AddInventory.rateContract = row.AAT_RATE_CONTRACT != null ? row.AAT_RATE_CONTRACT.toString() : "1";
            $scope.AddInventory.AAT_COST = row.AAT_AST_COST;
            /* $scope.AddInventory.Count = response.Table[0].AAT_CODE;*/
            $scope.AddInventory.AST_SNO = row.AAT_AST_SERIALNO;
            $scope.AddInventory.LIFE_SPAN = row.AAT_LIFE_SPAN;
            $scope.AddInventory.PO_NUM = row.AAT_PO_NUMBER;
            $scope.AddInventory.WAR_DT = row.AAT_WRNTY_DATE;
            $scope.AddInventory.PUR_DT = row.PURCHASEDDATE;
            $scope.AddInventory.MFG_DT = row.AAT_MFG_DATE;
            $scope.AddInventory.Depreciation = row.AAT_DEPRICIATION;
            $scope.AddInventory.STATUS = row.AAT_STA_ID != null ? row.AAT_STA_ID.toString() : "1";
            setStatusSelection($scope.AddInventory.STATUS);
            $scope.AddInventory.INV_NUM = row.AAT_INVOICE_NUM;
            $scope.AddInventory.Descrpition = row.AAT_DESCRIPTION;
            $scope.AddInventory.AMC = row.AAT_AMC_REQD != null ? row.AAT_AMC_REQD.toString() : "1";
            $scope.AddInventory.AMC_DT = row.AAT_AMC_DATE;
            $scope.AddInventory.Insurance = row.AAT_INS_REQD != null ? row.AAT_INS_REQD.toString() : "1";
            $scope.AddInventory.INSU_DT = row.AAT_INS_DATE;
            $scope.AddInventory.Count = "1";

            // Ensure output-model arrays are populated for Modify() payload.
            $scope.AssetMainCategoryList.Assetmaincatcode = firstTicked($scope.AssetMainCategoryList) ? [firstTicked($scope.AssetMainCategoryList)] : [];
            $scope.AssetSubCategoryList.Assetsubncatcode = firstTicked($scope.AssetSubCategoryList) ? [firstTicked($scope.AssetSubCategoryList)] : [];
            $scope.AssetBrandList.BrandCode = firstTicked($scope.AssetBrandList) ? [firstTicked($scope.AssetBrandList)] : [];
            $scope.AssetModelList.MdCode = firstTicked($scope.AssetModelList) ? [firstTicked($scope.AssetModelList)] : [];
            $scope.AssetlOCATIONList.lCMCODE = firstTicked($scope.AssetlOCATIONList) ? [firstTicked($scope.AssetlOCATIONList)] : [];
            $scope.AssetTowerList.twr_CODE = firstTicked($scope.AssetTowerList) ? [firstTicked($scope.AssetTowerList)] : [];
            $scope.AssetFloorList.flr_code = firstTicked($scope.AssetFloorList) ? [firstTicked($scope.AssetFloorList)] : [];
            $scope.AssetVENDORList.vendorCode = firstTicked($scope.AssetVENDORList) ? [firstTicked($scope.AssetVENDORList)] : [];
            $scope.AssetTYPEList.Assettype = firstTicked($scope.AssetTYPEList) ? [firstTicked($scope.AssetTYPEList)] : [];
            $scope.CostcenterList.Cost_Center_Code = firstTicked($scope.CostcenterList) ? [firstTicked($scope.CostcenterList)] : [];
            $scope.AssetCompanyList.AssettCompany = firstTicked($scope.AssetCompanyList) ? [firstTicked($scope.AssetCompanyList)] : [];

        })
    };

    //$scope.gridOptions = {
    //    columnDefs: columnDefs,
    //    rowData: null,
    //    enableColResize: true,
    //    enableSorting: true,
    //    cellClass: 'grid-align',
    //    angularCompileRows: true,
    //    enableCellSelection: false,
    //    suppressHorizontalScroll: false,
    //    enableFilter: true,

    //    onReady: function () {
    //        $scope.gridOptions1.api.sizeColumnsToFit()
    //    }
    //};


    $scope.gridOptions = {
        columnDefs: columnDefs,
        enableFilter: true,
        angularCompileRows: true,
        rowData: null,
        enableCellSelection: false,
        enableColResize: true,
        //showToolPanel: true,
        //groupAggFunction: groupAggFunction,
        groupHideGroupColumns: true,
        onAfterFilterChanged: function () {
            if (angular.equals({}, $scope.gridOptions.api.getFilterModel()))
                $scope.DocTypeVisible = 0;
            else
                $scope.DocTypeVisible = 1;
        }
    };


    $scope.Pageload();
    setStatusSelection("1");


    /* $scope.initializeGrid();*/


    $scope.applyQuickFilter = function () {
        $scope.Bindgrid();
    };

    /** Clears server search text, ag-grid column filters and quick filter on all grids on this page. */
    $scope.clearAllFiltersAndSearch = function () {
        $scope.AddInventory.Search = '';
        var grids = [
            $scope.gridOptions,
            $scope.gridOptions1,
            $scope.gridOptions2,
            $scope.gridOptions3,
            $scope.gridOptions4
        ];
        angular.forEach(grids, function (go) {
            if (!go || !go.api) return;
            if (typeof go.api.setFilterModel === 'function') {
                go.api.setFilterModel(null);
            }
            if (typeof go.api.setQuickFilter === 'function') {
                go.api.setQuickFilter('');
            }
            if (typeof go.api.refreshHeader === 'function') {
                go.api.refreshHeader();
            }
        });
        $scope.invCurrentPage = 1;
        $scope.invTotalPages = 1;
        /* Main list: reload full dataset from server (search may have replaced $scope.griddata with a filtered subset). */
        $scope.loadMainGridFromServer();
    };
    function rejectAddAssetInvalidFileName(file, input) {
        var allowed = typeof window.isAllowedAddAssetUploadFileName === 'function'
            ? window.isAllowedAddAssetUploadFileName(file && file.name)
            : true;
        if (allowed) return false;
        var msg = 'Special characters are not allowed in file name. Only letters, numbers, spaces, hyphen (-) and underscore (_) are allowed.';
        if (typeof window.notifyAddAssetUploadError === 'function') {
            window.notifyAddAssetUploadError(msg);
        } else if (typeof showNotification === 'function') {
            showNotification('error', 8, 'top-right', msg);
        }
        if (input) {
            input.value = '';
            if (typeof window.resetAddAssetInventoryFileLabel === 'function') {
                window.resetAddAssetInventoryFileLabel(input);
            }
        }
        return true;
    }

    function rejectAddAssetOversizedFile(file, input) {
        var check = typeof window.validateAddAssetInventoryFileSize === 'function'
            ? window.validateAddAssetInventoryFileSize(file)
            : { valid: !(file && file.size > 20 * 1024 * 1024), message: 'File size should not exceed 20 MB.' };
        if (check.valid) return false;
        if (typeof window.notifyAddAssetUploadError === 'function') {
            window.notifyAddAssetUploadError(check.message);
        } else if (typeof showNotification === 'function') {
            showNotification('error', 8, 'top-right', check.message);
        }
        if (input) {
            input.value = '';
            if (typeof window.resetAddAssetInventoryFileLabel === 'function') {
                window.resetAddAssetInventoryFileLabel(input);
            }
        }
        return true;
    }

    function rejectInvalidAddAssetBulkExcel(file, options, inputEl) {
        var check = typeof window.validateAddAssetExcelFile === 'function'
            ? window.validateAddAssetExcelFile(file, options)
            : { valid: true, message: '' };
        if (check.valid) return false;
        if (typeof window.notifyAddAssetUploadError === 'function') {
            window.notifyAddAssetUploadError(check.message);
        } else if (typeof showNotification === 'function') {
            showNotification('error', 8, 'top-right', check.message);
        }
        if (inputEl) {
            inputEl.value = '';
            if (typeof window.resetAddAssetInventoryFileLabel === 'function') {
                window.resetAddAssetInventoryFileLabel(inputEl);
            }
        }
        progress(0, '', false);
        return true;
    }

    $scope.fileUpload = function (x, type) {

        var types = type;

        //angular.forEach(x.files, function (file) {
        //    var fileObj = {
        //        FileName: file.name,
        //        FileSize: file.size,
        //        FileType: types,
        //        Type: type,
        //        data: file
        //    };
        var now = moment();
        var dateTimePrefix = now.format('YYYYMMDDHHmmss');

        selectedFiles.Files = (selectedFiles.Files || []).filter(function (f) {
            return f.Type !== types;
        });

        angular.forEach(x.files, function (file) {
            if (rejectAddAssetInvalidFileName(file, x)) {
                return;
            }
            if (rejectAddAssetOversizedFile(file, x)) {
                return;
            }
            // Create the new filename with date-time prefix
            var originalFileName = file.name;
            var fileExtension = originalFileName.split('.').pop();
            var baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.'));
            var newFileName = dateTimePrefix + '_' + baseName + '.' + fileExtension;

            var fileObj = {
                FileName: newFileName,
                FileSize: file.size,
                FileType: types,
                Type: type,
                data: file
            };
            var fileName = newFileName
            var Filetype = types
            switch (type) {
                case 'AAT_IMG':
                    $scope.$apply(function () {
                        $scope.AddInventory.AAT_IMG = fileName;
                    });
                    break;
                case 'AMC_DOC':
                    $scope.$apply(function () {
                        $scope.AddInventory.AMC_DOC = fileName;
                    });
                    break;
                case 'INS_DOC':
                    $scope.$apply(function () {
                        $scope.AddInventory.INS_DOC = fileName;
                    });
                    break;

                default:
                    break;
            }
            selecteddata[Filetype] = fileName;
            selectedFiles.Files.push(fileObj);
            Documents.push(fileObj);

            if (typeof window.updateAddAssetInventoryFileLabel === 'function') {
                window.updateAddAssetInventoryFileLabel(x, originalFileName);
            }

        });


    };
  function appendAssetFileToFormData(frmData, file, newFileName, docField) {
        if (!file || !newFileName || !docField) return false;
        frmData.append(docField, file, newFileName);
        return true;
    }

    function applyUploadedBlobPathsToForm(uploadData) {
        if (!$scope.AddInventory || !uploadData) return;
        var list = uploadData.files || uploadData.Files;
        if (!list || !list.length) return;

        angular.forEach(list, function (item) {
            if (!item || !item.BlobPath && !item.blobPath) return;
            var path = item.BlobPath || item.blobPath;
            var field = (item.Field || item.field || "").toUpperCase();
            if (field === "AAT_IMG") $scope.AddInventory.AAT_IMG = path;
            else if (field === "AMC_DOC") $scope.AddInventory.AMC_DOC = path;
            else if (field === "INS_DOC") $scope.AddInventory.INS_DOC = path;
        });
    }

    function buildAssetUploadFormData() {
        var frmData = new FormData();
        var count = 0;
        var prefix = moment().format('YYYYMMDDHHmmss');

        angular.forEach(selectedFiles.Files || [], function (fileObj) {
            if (!fileObj || !fileObj.data || !fileObj.FileName) return;
            var docField = fileObj.Type || fileObj.FileType;
            if (appendAssetFileToFormData(frmData, fileObj.data, fileObj.FileName, docField)) count++;
        });

        if (count === 0) {
            var inputMap = [
                { id: 'file3', type: 'AAT_IMG', field: 'AAT_IMG' },
                { id: 'file4', type: 'AMC_DOC', field: 'AMC_DOC' },
                { id: 'file5', type: 'INS_DOC', field: 'INS_DOC' }
            ];
            angular.forEach(inputMap, function (cfg) {
                var input = document.getElementById(cfg.id);
                if (!input || !input.files || !input.files.length) return;
                var f = input.files[0];
                if (rejectAddAssetOversizedFile(f, input)) return;
                var ext = f.name.split('.').pop();
                var base = f.name.substring(0, f.name.lastIndexOf('.'));
                var newFileName = prefix + '_' + base + '.' + ext;
                if (appendAssetFileToFormData(frmData, f, newFileName, cfg.type)) {
                    count++;
                }
            });
        }

        return count > 0 ? frmData : null;
    }

    $scope.saveImg = function () {
        var frmData = buildAssetUploadFormData();
        if (!frmData) return $q.when(null);

        return $http.post(UtilityService.path + '/api/AddAssetInventory/UploadFiles', frmData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
            var data = response && response.data != null ? response.data : null;
            var msg = "";
            var success = false;

            if (data && typeof data === "object") {
                msg = data.Message || data.message || "";
                success = data.Success === true || data.success === true;
                if (success && data.files) {
                    applyUploadedBlobPathsToForm(data);
                }
            } else if (data != null) {
                msg = String(data);
                success = msg.indexOf("Upload Failed") < 0;
            }

            if (!success) {
                return $q.reject({ message: msg || "Upload Failed" });
            }
            return response;
        });
    };




    /** Syncs filename into scope after validateAndSelectFile scan (file inputs do not use ng-model — avoids Angular file+required bugs). */
    $scope.SelectFile = function (event) {
        var input = event && event.target ? event.target : null;
        if (!input || !input.files || !input.files.length) return;
        if (rejectAddAssetOversizedFile(input.files[0], input)) return;
        var nm = input.files[0].name;
        if (input.id === 'file3') {
            $scope.AddInventory.AAT_IMG = nm;
        } else if (input.id === 'file4') {
            $scope.AddInventory.AMC_DOC = nm;
        } else if (input.id === 'file5') {
            $scope.AddInventory.INS_DOC = nm;
        }
        if (typeof window.updateAddAssetInventoryFileLabel === 'function') {
            window.updateAddAssetInventoryFileLabel(input, nm);
        }
    };

    /**
     * When tenant uses ASSET_AAT_CODE_BY_SUBCAT, server expects AAT_NAME from GET_NEXT_ASSET_CODE_BY_SUBCAT.
     * That call is async in GetAssetLabel; refresh here before save so Add works even if user clicks Add quickly.
     */
    $scope.requireSubcategoryAssetIdPromise = function () {
        var deferred = $q.defer();
        if (!$scope.useSubcategoryAssetCodePref || !$scope.sysPrefAssetSubcatLoaded) {
            deferred.resolve();
            return deferred.promise;
        }
        var existing = ($scope.AddInventory && $scope.AddInventory.AAT_NAME != null) ? String($scope.AddInventory.AAT_NAME).trim() : '';
        if (existing !== '') {
            deferred.resolve();
            return deferred.promise;
        }
        var subRow = getSelectedFromOutputModel($scope.AssetSubCategoryList, 'Assetsubncatcode');
        var subCode = '';
        if (subRow && typeof subRow === 'object') {
            subCode = (subRow.Assetsubncatcode != null ? String(subRow.Assetsubncatcode) : (subRow.assetsubncatcode != null ? String(subRow.assetsubncatcode) : '')).trim();
        } else if (subRow != null && typeof subRow !== 'object') {
            subCode = String(subRow).trim();
        }
        if (!subCode) {
            if (typeof showNotification === 'function') {
                showNotification('error', 8, 'top-right', 'Please select Asset Subcategory so Asset ID can be assigned.');
            }
            deferred.reject('no_sub');
            return deferred.promise;
        }
        AddAssetInventoryService.GetNextAssetCodeBySubCategory({ AST_SUB_CAT: subCode }).then(function (response) {
            var next = '';
            if (response) {
                next = response.NextCode != null ? String(response.NextCode).trim() : (response.nextCode != null ? String(response.nextCode).trim() : '');
                if (!next && (response.Message || response.message)) {
                    console.warn('GetNextAssetCodeBySubCategory:', response.Message || response.message);
                }
            }
            $scope.AddInventory = $scope.AddInventory || {};
            $scope.AddInventory.AAT_NAME = next || '';
            if ($scope.AddInventory.AAT_NAME) {
                deferred.resolve();
            } else {
                var errMsg = (response && (response.Message || response.message)) ? String(response.Message || response.message) : 'Asset ID could not be assigned. Check subcategory prefix configuration.';
                if (typeof showNotification === 'function') {
                    showNotification('error', 8, 'top-right', errMsg);
                }
                deferred.reject('empty_code');
            }
        }, function () {
            if (typeof showNotification === 'function') {
                showNotification('error', 8, 'top-right', 'Unable to resolve Asset ID from server.');
            }
            deferred.reject('api');
        });
        return deferred.promise;
    };

    /**
     * Add Capital Asset: do not gate on frmAddInventory.$valid (optional fields with ng-pattern / tenant-specific
     * controls were blocking save). Mandatory checks live in submit() + SubmitData().
     */
    $scope.addInventoryValidSubmit = function () {
        var prefPromise = $scope.sysPrefAssetSubcatLoaded
            ? $q.when()
            : AddAssetInventoryService.GetSubcategoryAssetIdEnabled().then(function (r) {
                $scope.useSubcategoryAssetCodePref = !!(r && (r.Enabled === true || r.enabled === true || r.Enabled === 1 || r.enabled === 1
                    || String(r.Enabled).toLowerCase() === 'true' || String(r.enabled).toLowerCase() === 'true'));
                $scope.sysPrefAssetSubcatLoaded = true;
                $scope.aatNameNgPattern = ($scope.useSubcategoryAssetCodePref) ? /^[\s\S]{0,500}$/ : /^[A-Za-z0-9 /]+$/;
                $timeout(function () {
                    if (!$scope.AAT_ID && !$scope.save && typeof $scope.GetAssetLabel === 'function') {
                        $scope.GetAssetLabel();
                    }
                }, 0);
            }, function () {
                $scope.useSubcategoryAssetCodePref = false;
                $scope.sysPrefAssetSubcatLoaded = true;
                $scope.aatNameNgPattern = /^[A-Za-z0-9 /]+$/;
            });
        prefPromise.then(function () {
            return $scope.requireSubcategoryAssetIdPromise();
        }).then(function () {
            $scope.submit();
        }, angular.noop);
    };

    /** Form submit / Enter key: bypass Utility validSubmit $valid gate; still show inline errors via $submitted. */
    $scope.addInventoryFormSubmit = function ($event) {
        if ($event) {
            $event.preventDefault();
            if ($event.stopPropagation) $event.stopPropagation();
        }
        if ($scope.frmAddInventory) {
            $scope.frmAddInventory.$submitted = true;
        }
        $scope.addInventoryValidSubmit();
    };

    $scope.submit = function () {
        var desc = $scope.AddInventory && $scope.AddInventory.Descrpition;
        if (desc == null || String(desc).trim() === '') {
            $scope.isVisible = true;
            if (typeof showNotification === 'function') {
                showNotification('error', 8, 'top-right', 'Please enter Description.');
            }
            return;
        }
        if (!($scope.useSubcategoryAssetCodePref && $scope.sysPrefAssetSubcatLoaded)) {
            var manualName = $scope.AddInventory.AAT_NAME;
            if (manualName == null || String(manualName).trim() === '') {
                $scope.isValidate = true;
                if (typeof showNotification === 'function') {
                    showNotification('error', 8, 'top-right', 'Please enter Asset ID.');
                }
                return;
            }
        }
        var costRaw = $scope.AddInventory && $scope.AddInventory.AAT_COST;
        if (costRaw == null || String(costRaw).trim() === '') {
            if (typeof showNotification === 'function') {
                showNotification('error', 8, 'top-right', 'Please enter Asset Price.');
            }
            return;
        }
        if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(String(costRaw).trim())) {
            if (typeof showNotification === 'function') {
                showNotification('error', 8, 'top-right', 'Asset Price (In Cost) allows numbers and decimals only.');
            }
            return;
        }
        var invChk = $scope.validateInventoryTextFields();
        if (!invChk.ok) {
            if (typeof showNotification === 'function') {
                showNotification('error', 8, 'top-right', invChk.message);
            }
            return;
        }
        if ($scope.useSubcategoryAssetCodePref && $scope.sysPrefAssetSubcatLoaded) {
            var autoId = ($scope.AddInventory.AAT_NAME != null) ? String($scope.AddInventory.AAT_NAME).trim() : '';
            if (!autoId) {
                if (typeof showNotification === 'function') {
                    showNotification('error', 8, 'top-right', 'Asset ID was not assigned. Re-select Subcategory or wait a moment and try again.');
                }
                return;
            }
        }
        if ($scope.AddInventory.AMC !== '0' && $scope.AddInventory.AMC !== '1') {
            $scope.AddInventory.AMC = '0';
        }
        if ($scope.AddInventory.Insurance !== '0' && $scope.AddInventory.Insurance !== '1') {
            $scope.AddInventory.Insurance = '0';
        }
        if ($scope.AddInventory.Count == null || String($scope.AddInventory.Count).trim() === '') {
            $scope.AddInventory.Count = '1';
        }
        $scope.AddInventory.Search = "";
        $scope.isVisible = false;
        $scope.SubmitData();
        $scope.griddata1 = true;
    }

    $scope.SubmitData = function () {
        try {
        var modelRow = resolveModelRowForSave($scope.AssetModelList);
        if (!modelRow || !modelRow.MdCode) {
            showNotification('error', 8, 'top-right', 'Please select Asset Model.');
            return;
        }
        var selectedCompany = getSelectedFromOutputModel($scope.AssetCompanyList, 'AssettCompany');
        if (!selectedCompany) {
            showNotification('error', 8, 'top-right', 'Please select Asset For.');
            return;
        }
        var selectedMainCat = getSelectedFromOutputModel($scope.AssetMainCategoryList, 'Assetmaincatcode');
        var selectedSubCat = getSelectedFromOutputModel($scope.AssetSubCategoryList, 'Assetsubncatcode');
        var selectedBrand = getSelectedFromOutputModel($scope.AssetBrandList, 'BrandCode');
        var selectedLoc = getSelectedFromOutputModel($scope.AssetlOCATIONList, 'lCMCODE');
        var selectedTower = getSelectedFromOutputModel($scope.AssetTowerList, 'twr_CODE');
        var selectedFloor = getSelectedFromOutputModel($scope.AssetFloorList, 'flr_code');
        var selectedVendor = getSelectedFromOutputModel($scope.AssetVENDORList, 'vendorCode');
        var selectedType = getSelectedFromOutputModel($scope.AssetTYPEList, 'Assettype');
        var selectedCostCenter = getSelectedFromOutputModel($scope.CostcenterList, 'Cost_Center_Code');

        var astCatCode = '';
        if (selectedMainCat && typeof selectedMainCat === 'object') {
            astCatCode = (selectedMainCat.Assetmaincatcode != null ? String(selectedMainCat.Assetmaincatcode) : (selectedMainCat.assetmaincatcode != null ? String(selectedMainCat.assetmaincatcode) : '')).trim();
        } else if (selectedMainCat != null && typeof selectedMainCat !== 'object') {
            astCatCode = String(selectedMainCat).trim();
        }
        if (!astCatCode) {
            showNotification('error', 8, 'top-right', 'Please select Asset Category.');
            return;
        }
        var astSubCode = '';
        if (selectedSubCat && typeof selectedSubCat === 'object') {
            astSubCode = (selectedSubCat.Assetsubncatcode != null ? String(selectedSubCat.Assetsubncatcode) : (selectedSubCat.assetsubncatcode != null ? String(selectedSubCat.assetsubncatcode) : '')).trim();
        } else if (selectedSubCat != null && typeof selectedSubCat !== 'object') {
            astSubCode = String(selectedSubCat).trim();
        }
        if (!astSubCode) {
            showNotification('error', 8, 'top-right', 'Please select Asset Subcategory.');
            return;
        }
        var astBrdCode = '';
        if (selectedBrand && typeof selectedBrand === 'object') {
            astBrdCode = (selectedBrand.BrandCode != null ? String(selectedBrand.BrandCode) : (selectedBrand.brandCode != null ? String(selectedBrand.brandCode) : '')).trim();
        } else if (selectedBrand != null && typeof selectedBrand !== 'object') {
            astBrdCode = String(selectedBrand).trim();
        }
        if (!astBrdCode) {
            showNotification('error', 8, 'top-right', 'Please select Asset Brand.');
            return;
        }
        if (!selectedLoc) {
            showNotification('error', 8, 'top-right', 'Please select Location.');
            return;
        }
        var astLoc = resolveLocationCodeFromItem(selectedLoc);
        if (!astLoc) {
            showNotification('error', 8, 'top-right', 'Location code is missing. Re-select Location and try again.');
            return;
        }
        var twrCode = '';
        if (selectedTower && typeof selectedTower === 'object') {
            twrCode = (selectedTower.twr_CODE != null ? String(selectedTower.twr_CODE) : (selectedTower.twr_code != null ? String(selectedTower.twr_code) : '')).trim();
        }
        if (!twrCode) {
            showNotification('error', 8, 'top-right', 'Please select Tower.');
            return;
        }
        var flrCode = '';
        if (selectedFloor && typeof selectedFloor === 'object') {
            flrCode = (selectedFloor.flr_code != null ? String(selectedFloor.flr_code) : (selectedFloor.FLR_CODE != null ? String(selectedFloor.FLR_CODE) : '')).trim();
        }
        if (!flrCode) {
            showNotification('error', 8, 'top-right', 'Please select Floor.');
            return;
        }
        if (selectedVendor == null || selectedVendor === '') {
            showNotification('error', 8, 'top-right', 'Please select Vendor.');
            return;
        }
        var vendorCode = '';
        if (typeof selectedVendor === 'object') {
            vendorCode = selectedVendor.vendorCode != null ? String(selectedVendor.vendorCode).trim() : '';
        } else {
            vendorCode = String(selectedVendor).trim();
        }
        if (!vendorCode) {
            showNotification('error', 8, 'top-right', 'Please select Vendor.');
            return;
        }
        if (selectedType == null || selectedType === '') {
            showNotification('error', 8, 'top-right', 'Please select Asset Type.');
            return;
        }
        var aatTypeVal = '';
        if (typeof selectedType === 'object' && selectedType.Assettype != null) {
            aatTypeVal = String(selectedType.Assettype).trim();
        } else if (typeof selectedType !== 'object') {
            aatTypeVal = String(selectedType).trim();
        }
        if (!aatTypeVal) {
            showNotification('error', 8, 'top-right', 'Please select Asset Type.');
            return;
        }

        var mdCode = modelRow.MdCode;
        var mdName = modelRow.MdName;
        if (mdCode == null || String(mdCode).trim() === '') {
            showNotification('error', 8, 'top-right', 'Asset Model is incomplete. Re-select Model.');
            return;
        }
        if (mdName == null || String(mdName).trim() === '') mdName = mdCode;

        var lob = '';
        if (selectedCostCenter && selectedCostCenter.Cost_Center_Code != null)
            lob = String(selectedCostCenter.Cost_Center_Code);

        var aatDep = $scope.AddInventory.Depreciation;
        if (aatDep == null || String(aatDep).trim() === '') aatDep = '0';

        var aatCom = '';
        if (selectedCompany && typeof selectedCompany === 'object' && selectedCompany.AssettCompany != null) {
            aatCom = String(selectedCompany.AssettCompany);
        } else if (selectedCompany != null) {
            aatCom = String(selectedCompany);
        }

        var obj = {
            AST_CAT: astCatCode,
            AST_SUB_CAT: astSubCode,
            AST_BRD: astBrdCode,
            AST_MODEL: mdCode,
            AST_MODEL_NAME: mdName,
            AST_LOC: astLoc,
            AST_TOWER: twrCode,
            AST_FLR: flrCode,
            AAT_CODE: $scope.AddInventory.AAT_CODE,
            AAT_NAME: $scope.AddInventory.AAT_NAME,
            AST_VENDOR: vendorCode,
            AST_RT_CNT: $scope.AddInventory.rateContract,
            AAT_COST: $scope.AddInventory.AAT_COST,
            AAT_CNT: $scope.AddInventory.Count,
            AAT_SNO: $scope.AddInventory.AST_SNO,
            AAT_TYPE: aatTypeVal,
            AAT_LF_SP: $scope.AddInventory.LIFE_SPAN,
            AAT_PO_NO: $scope.AddInventory.PO_NUM,
            AAT_WAR_DT: $scope.AddInventory.WAR_DT,
            AAT_PUR_DT: $scope.AddInventory.PUR_DT,
            AAT_MFG_DT: $scope.AddInventory.MFG_DT,
            AAT_DEP: aatDep,
            AAT_LOB: lob,
            AAT_COM: aatCom,
            AAT_INV: $scope.AddInventory.INV_NUM,
            AAT_DES: $scope.AddInventory.Descrpition,
            AAT_AMT_DT: $scope.AddInventory.AMC_DT,
            AAT_INS_DT: $scope.AddInventory.INSU_DT,
            AAT_STATUS: $scope.AddInventory.STATUS,
            AAT_AMT_INC: $scope.AddInventory.AMC,
            AAT_INS_INC: $scope.AddInventory.Insurance,
            AAT_INC_DOC: $scope.AddInventory.INS_DOC,
            AAT_AMC_DOC: $scope.AddInventory.AMC_DOC,
            AAT_AST_IMG: $scope.AddInventory.AAT_IMG,
            SpareDataList: $scope.spareList

        };
        $scope.saveImg().then(function () {
            return AddAssetInventoryService.SaveAssetDetails(obj);
        }).then(function (response) {
            var msg = apiMessage(response);
            var rows = apiDataRows(response);
            var firstRow = rows[0] || {};
            var astId = rowAstId(firstRow);
            var aurName = rowAurName(firstRow);

            if (msg === "Details are Inserted Successfully") {
                if ($scope.frmAddInventory) $scope.frmAddInventory.$submitted = false;
                $scope.ShowMessage = true;
                $scope.Success = "Asset Added Successfully";
                showNotification('success', 8, 'top-right', $scope.Success);
                $scope.clear();
                $scope.AddInventory.Search = '';
                try {
                    var ft = document.getElementById('filtertxt');
                    if (ft) ft.value = '';
                } catch (e) { /* ignore */ }
                /* Bindgrid() can reuse stale $scope.griddata when search is empty — refetch so the new row appears. */
                $scope.loadMainGridFromServer();
                $timeout(function () {
                    var el = document.querySelector('.page-asset-recon .inventory-list-grid-wrapper')
                        || document.querySelector('.inventory-list-grid-wrapper');
                    if (el && el.scrollIntoView) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 350);
            }
            else if (response.data === "Asset Already Exist" || msg === "Asset Already Exist") {
                if ($scope.frmAddInventory) $scope.frmAddInventory.$submitted = false;
                $scope.ShowMessage = true;
                $scope.error = "Asset Name Already Exist";

                showNotification('error', 8, 'top-right', $scope.error);

                AddAssetInventoryService.GetGridData().then(function (response) {
                    $scope.griddata = response.Table;
                    $scope.gridOptions.api.setRowData($scope.griddata);
                    setTimeout(function () {
                        progress(0, 'Loading...', false);
                        $scope.$apply(function () {
                            $scope.ShowMessage = false;
                        });
                    }, 600);
                })
            }

            else {
                showNotification('error', 8, 'top-right', toastErrorMessage(response));
            }

        }).catch(function (err) {
            var m = 'Unable to save asset. Please try again.';
            if (err && err.data) {
                if (typeof err.data === 'string') m = err.data;
                else if (err.data.Message) m = err.data.Message;
                else if (err.data.message) m = err.data.message;
            } else if (err && err.statusText) {
                m = err.statusText;
            }
            if (typeof showNotification === 'function') {
                showNotification('error', 8, 'top-right', m);
            }
        });

        } catch (e) {
            console.error('SubmitData', e);
            if (typeof showNotification === 'function') {
                showNotification('error', 8, 'top-right', 'Could not submit: ' + (e && e.message ? e.message : 'Please re-select dropdowns and try again.'));
            }
        }
    }
    $scope.clear = function () {
        var savedSelectedType = ($scope.AddInventory && $scope.AddInventory.selectedType) ? $scope.AddInventory.selectedType : 'NewAssetsAdd';
        $scope.AAT_ID = "";
        $scope.AddInventory = {};
        $scope.AddInventory.selectedType = savedSelectedType;
        $scope.selectedFiles = {};
        selectedFiles.Files = [];
        Documents.length = 0;
        selecteddata = {};
        angular.forEach($scope.AssetMainCategoryList, function (Zdata) {
            Zdata.ticked = false;
        });
        angular.forEach($scope.AssetSubCategoryList, function (Vdata) {
            Vdata.ticked = false;
        });
        angular.forEach($scope.CostcenterList, function (cdata) {
            cdata.ticked = false;
        });
        angular.forEach($scope.AssetVENDORList, function (Vendata) {
            Vendata.ticked = false;
        });
        angular.forEach($scope.AssetTYPEList, function (Adata) {
            Adata.ticked = false;
        });
        angular.forEach($scope.AssetBrandList, function (Adata) {
            Adata.ticked = false;
        });
        angular.forEach($scope.AssetModelList, function (Mdata) {
            Mdata.ticked = false;
        });
        angular.forEach($scope.AssetlOCATIONList, function (Ldata) {
            Ldata.ticked = false;
        });
        angular.forEach($scope.AssetTowerList, function (tdata) {
            tdata.ticked = false;
        });
        angular.forEach($scope.AssetFloorList, function (fdata) {
            fdata.ticked = false;
        });
        angular.forEach($scope.AssetFloorLists, function (fdata) {
            fdata.ticked = false;
        });
        angular.forEach($scope.AssetSpaceList, function (sdata) {
            sdata.ticked = false;
        });
        resetAssetSpaceList();
        resetAssetEmployeeList();
        angular.forEach($scope.AssetModelLists, function (Ldata) {
            Ldata.ticked = false;
        });
        angular.forEach($scope.AssetTowerLists, function (tdata) {
            tdata.ticked = false;
        });
        angular.forEach($scope.AssetBrandLists, function (fdata) {
            fdata.ticked = false;
        });
        angular.forEach($scope.AssetSubCategoryListS, function (Ldata) {
            Ldata.ticked = false;
        });

        $scope.AddInventory.STATUS = "1";
        setStatusSelection("1");
        $scope.AddInventory.rateContract = "1";
        $scope.AddInventory.AMC = "1";
        $scope.AddInventory.Insurance = "1";
        $scope.AddInventory.Count = "1";
        $scope.AddInventory.AAT_IMG = null;
        $scope.AddInventory.AMC_DOC = null;
        $scope.AddInventory.INS_DOC = null;
        $scope.AddInventory.INS_DOC_FILENAME = '';

        $timeout(function () {
            if (typeof window.clearAllAddAssetInventoryFileUploads === 'function') {
                window.clearAllAddAssetInventoryFileUploads();
            } else {
                angular.element('input[type="file"]').val(null);
            }
            if (typeof $scope.refreshAddInventoryFormProxies === 'function') {
                $scope.refreshAddInventoryFormProxies();
            }
        }, 0);
    }

    $scope.Modify = function () {
        if ($scope.frmAddInventory) $scope.frmAddInventory.$submitted = true;
        $scope.update();
        $scope.griddata1 = true;
        $scope.AddInventory.Search = "";
    }
    $scope.update = function () {
        if (!$scope.AAT_ID) {
            showNotification('error', 8, 'top-right', 'Please click Edit on an asset row before modifying.');
            return;
        }
        var invChkUpd = $scope.validateInventoryTextFields();
        if (!invChkUpd.ok) {
            showNotification('error', 8, 'top-right', invChkUpd.message);
            return;
        }
        var modelRowUpd = resolveModelRowForSave($scope.AssetModelList);
        if (!modelRowUpd || !modelRowUpd.MdCode) {
            showNotification('error', 8, 'top-right', 'Please select Asset Model before modify.');
            return;
        }
        var selectedCompany = getSelectedFromOutputModel($scope.AssetCompanyList, 'AssettCompany');
        if (!selectedCompany) {
            showNotification('error', 8, 'top-right', 'Please select Asset For.');
            return;
        }
        var selectedCostCenter = getSelectedFromOutputModel($scope.CostcenterList, 'Cost_Center_Code');
        var selectedType = getSelectedFromOutputModel($scope.AssetTYPEList, 'Assettype');
        var selectedMainCat = getSelectedFromOutputModel($scope.AssetMainCategoryList, 'Assetmaincatcode');
        var selectedSubCat = getSelectedFromOutputModel($scope.AssetSubCategoryList, 'Assetsubncatcode');
        var selectedBrand = getSelectedFromOutputModel($scope.AssetBrandList, 'BrandCode');
        var selectedLoc = getSelectedFromOutputModel($scope.AssetlOCATIONList, 'lCMCODE');
        var selectedTower = getSelectedFromOutputModel($scope.AssetTowerList, 'twr_CODE');
        var selectedFloor = getSelectedFromOutputModel($scope.AssetFloorList, 'flr_code');
        var selectedVendor = getSelectedFromOutputModel($scope.AssetVENDORList, 'vendorCode');
        var astLocUpd = selectedLoc ? resolveLocationCodeFromItem(selectedLoc) : '';
        var obj = {
            AAT_ID: $scope.AAT_ID,
            AST_CAT: selectedMainCat ? selectedMainCat.Assetmaincatcode : "",
            AST_SUB_CAT: selectedSubCat ? selectedSubCat.Assetsubncatcode : "",
            AST_BRD: selectedBrand ? selectedBrand.BrandCode : "",
            AST_MODEL: modelRowUpd.MdCode,
            AST_MODEL_NAME: modelRowUpd.MdName,
            AST_LOC: astLocUpd,
            AST_TOWER: selectedTower ? selectedTower.twr_CODE : "",
            AST_FLR: selectedFloor ? selectedFloor.flr_code : "",
            AAT_CODE: $scope.AddInventory.AAT_CODE,
            AAT_NAME: $scope.AddInventory.AAT_NAME,
            AST_VENDOR: selectedVendor ? selectedVendor.vendorCode : "",
            AST_RT_CNT: $scope.AddInventory.rateContract,
            AAT_COST: $scope.AddInventory.AAT_COST,
            AAT_CNT: $scope.AddInventory.Count,
            AAT_SNO: $scope.AddInventory.AST_SNO,
            AAT_TYPE: selectedType ? selectedType.Assettype : "",
            AAT_LF_SP: $scope.AddInventory.LIFE_SPAN,
            AAT_PO_NO: $scope.AddInventory.PO_NUM,
            AAT_WAR_DT: $scope.AddInventory.WAR_DT,
            AAT_PUR_DT: $scope.AddInventory.PUR_DT,
            AAT_MFG_DT: $scope.AddInventory.MFG_DT,
            AAT_DEP: $scope.AddInventory.Depreciation,
            AAT_LOB: selectedCostCenter ? selectedCostCenter.Cost_Center_Code : "",
            AAT_COM: selectedCompany ? selectedCompany.AssettCompany : "",
            AAT_INV: $scope.AddInventory.INV_NUM,
            AAT_DES: $scope.AddInventory.Descrpition,
            AAT_AMT_DT: $scope.AddInventory.AMC_DT,
            AAT_INS_DT: $scope.AddInventory.INSU_DT,
            AAT_STATUS: $scope.AddInventory.STATUS,
            AAT_AMT_INC: $scope.AddInventory.AMC,
            AAT_INS_INC: $scope.AddInventory.Insurance,
            AAT_INC_DOC: $scope.AddInventory.INS_DOC,
            AAT_AMC_DOC: $scope.AddInventory.AMC_DOC,
            AAT_AST_IMG: $scope.AddInventory.AAT_IMG,
            SpareDataList: $scope.spareList


        };
        $scope.saveImg().then(function () {
            return AddAssetInventoryService.ModifyAssetDetails(obj);
        }).then(function (response) {
            var msg = apiMessage(response);
            var rows = apiDataRows(response);
            var firstRow = rows[0] || {};
            var astId = rowAstId(firstRow);
            var aurName = rowAurName(firstRow);

            if (msg === "Details are Modified Successfully") {
                if ($scope.frmAddInventory) $scope.frmAddInventory.$submitted = false;
                $scope.ShowMessage = true;
                $scope.Success = "Asset Modified Successfully";
                $scope.save = false;
                $scope.modify = true;
                showNotification('success', 8, 'top-right', $scope.Success);

                $scope.clear();
                $scope.AddInventory.Search = '';
                try {
                    var ft2 = document.getElementById('filtertxt');
                    if (ft2) ft2.value = '';
                } catch (e) { /* ignore */ }
                $scope.loadMainGridFromServer();
                $timeout(function () {
                    var el = document.querySelector('.page-asset-recon .inventory-list-grid-wrapper')
                        || document.querySelector('.inventory-list-grid-wrapper');
                    if (el && el.scrollIntoView) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 350);
            }
            else {
                showNotification('error', 8, 'top-right', toastErrorMessage(response));
            }

        });

    }



    $scope.UploadExcel = function () {
        var fileInput = $('#fileUpl')[0];

        if (fileInput && fileInput.files.length > 0) {
            var file = fileInput.files[0];
            if (rejectInvalidAddAssetBulkExcel(file, {
                allowedExtensions: ['xls', 'xlsx'],
                typeMessage: 'Please Upload only Excel File(s)'
            }, fileInput)) {
                return;
            }
            var filetype = file.name.split('.').pop().toLowerCase();

            if (filetype === "xlsx" || filetype === "xls") {
                if (!window.FormData) {
                    redirect(); // if IE8
                    return;
                }
                var UplFile = $('#fileUpl')[0];
                var formData = new FormData();
                formData.append("ExUpload", file);

                formData.append("UplFile", UplFile.files[0]);
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, { type: 'binary' });
                    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    var rowCount = XLSX.utils.decode_range(worksheet['!ref']).e.r + 1;

                    if (rowCount > 1001) {
                        progress(0, '', false);
                        showNotification('error', 8, 'top-right', 'Upload limit exceeded. Please upload a file with up to 1000 rows.');
                        return;
                    }
                    progress(0, 'Loading...', true);

                    $.ajax({
                        url: UtilityService.path + "/api/AddAssetInventory/UploadExcel",
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (response.data1) {
                                $scope.$apply(function () {
                                    $scope.gridata1 = response.data1;
                                    $scope.gridOptions1.api.setRowData([]);
                                    $scope.gridOptions1.api.setRowData($scope.gridata1);
                                    $scope.griddata1 = false
                                    $scope.gridOptions1.api.refreshHeader();
                                    $scope.tempAssetsobj = response.data1;
                                    $scope.loadMainGridFromServer();
                                    $('#fileUpl').val('');
                                    if (typeof window.resetAddAssetInventoryFileLabel === 'function') {
                                        window.resetAddAssetInventoryFileLabel(fileInput);
                                    }
                                    progress(0, '', false);
                                });
                            } else {
                                progress(0, '', false);
                                showNotification('error', 8, 'top-right', toastErrorMessage(response));
                            }
                        },
                        error: function (xhr) {
                            progress(0, '', false);
                            var payload = parseAjaxErrorPayload(xhr);
                            showNotification('error', 8, 'top-right', toastErrorMessage(payload) || (xhr && xhr.statusText) || 'Upload failed.');
                        }
                    });
                };
                reader.readAsBinaryString(UplFile.files[0]);

            } else {
                progress(0, 'Loading...', false);
                showNotification('error', 8, 'top-right', 'Please Upload only Excel File(s)');
            }
        } else {
            showNotification('error', 8, 'top-right', 'Please Select File To Upload');
        }
    }

    $scope.back = function () {
        window.location = "/Masters/Asset_Master/Views/AssetMasters.aspx";
    }



    function fitToColumn(arrayOfArray) {
        // get maximum character of each column
        const keys = Object.keys(arrayOfArray[0]);
        return keys.map(function (key) {
            const columnValues = arrayOfArray.map(function (obj) {
                return obj[key] ? obj[key].toString().length : 0;
            });

            return { wch: Math.max.apply(null, columnValues) };
        });
    }

    $scope.GenReport = function () {
        //$scope.GenReport() = function () {
        $scope.datavalue = [];
        angular.forEach($scope.gridOptions1.rowData, function (value, key) {
            $scope.datavalue.push({ 'Remarks': value.Remarks, 'Asset SNO': value.AssetSNO, 'Asset Vendor': value.AssetVendor, 'Category': value.AssetCategory, 'SubCategory': value.AssetSubCategory, 'Brand': value.AssetBrand, 'Model': value.AssetModel, 'Location': value.AssetLocation, 'Tower': value.Tower, 'Floor': value.Floor, 'Purchased Date': value.PurchaseDate, 'Invoice Number': value.InvoiceNumber, 'Invoice Date': value.InvoiceDate, 'Warranty Date': value.WarrantyDate, 'PO Number': value.PONumber, 'Asset Cost': value.AssetCost, 'Serial No': value.AAT_Serial_No, 'Description': value.AssetDescription });
        });

        var ws = XLSX.utils.json_to_sheet($scope.datavalue);
        ws['!cols'] = fitToColumn($scope.datavalue);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "AssetReport");
        XLSX.writeFile(wb, "AssetReport.xlsx");
    }


    $scope.assetActionCollapsed = false;
    $scope.toggleAssetActionFilters = function () {
        $scope.assetActionCollapsed = !$scope.assetActionCollapsed;
    };
    $scope.sparePartsCollapsed = false;
    $scope.toggleSparePartsFilters = function () {
        $scope.sparePartsCollapsed = !$scope.sparePartsCollapsed;
    };
    $scope.selectNewAssetsAdd = function () { /* Upload New Assets - no extra init needed */ };
    $scope.onAssetActionChange = function () {
        if ($scope.AddInventory.selectedType === 'NewAssetsAdd') {
            $scope.selectNewAssetsAdd();
        } else if ($scope.AddInventory.selectedType === 'TransferInactive') {
            $scope.selectTransferInactive();
        } else if ($scope.AddInventory.selectedType === 'AssetsModify') {
            $scope.selectAssetsModify();
        }
    };
    $scope.selectTransferInactive = function () {
        AddAssetInventoryService.GetAssetCity().then(function (CityData) {
            $scope.AssetCITYList = CityData;
            $scope.AssetlOCATIONTransferList = [];
            AllCities = CityData;

            AddAssetInventoryService.GetAssetlOCATIONS_ForTransfer().then(function (LocationData) {
                $scope.AssetlOCATIONTransferListS = LocationData;
                AllLocations = LocationData;

            }, function (error) {
                console.error('', error);
            });
        }, function (error) {
            console.error('', error);
        });
    }



    $scope.CityItemClick = function () {

        var SelectedCities = $scope.AssetCITYList.CTY_CODE.filter(city => city.ticked).map(city => city.CTY_CODE)
        $scope.AssetlOCATIONTransferList = AllLocations.filter(location => SelectedCities.includes(location.CTY_CODE));
    }



    $scope.CitySelectAll = function () {

        $scope.AssetCITYList = AllCities;
        var allcities = $scope.AssetCITYList.filter(city => city.ticked).map(city => city.CTY_CODE)
        $scope.AssetlOCATIONTransferList = AllLocations.filter(location => allcities.includes(location.CTY_CODE));
    }

    $scope.CitySelectNone = function () {
        $scope.AssetlOCATIONTransferList = [];
    }

    $scope.DownloadAssets = function () {
        progress(0, 'Loading...', true);
        if ($scope.AssetCITYList.CTY_CODE.length == 0) {
            progress(0, '', false);
            showNotification('error', 8, 'top-right', "Please select City");
        }
        else if ($scope.AssetlOCATIONTransferList.LCM_CODE.length == 0) {
            progress(0, '', false);
            showNotification('error', 8, 'top-right', "Please select Location");
        }
        else {
            $scope.dataobj =
            {
                CtyDetails: $scope.AssetCITYList.CTY_CODE,
                LocDetails: $scope.AssetlOCATIONTransferList.LCM_CODE
            };

            progress(0, 'Loading...', true);
            $http({
                url: UtilityService.path + '/api/AddAssetInventory/DownloadTemplate_ForTransferAssets',
                method: 'POST',
                responseType: 'arraybuffer',
                data: $scope.dataobj, //this is your json data string
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            }).then(function (data) {
                if (data.data.byteLength > 27) {
                    var blob = new Blob([data.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    save(blob, 'AssetTransferTemplate.xlsx');
                }
                else {
                    progress(0, '', false);
                    showNotification('error', 8, 'top-right', "No data Found");

                }
            }).catch(function () {
                progress(0, '', false);
            });
        }
    }
    function save(blob, fileName) {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
            progress(0, '', false);
        } else {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
            $scope.ToggleDiv = !$scope.ToggleDiv;
            progress(0, '', false);
        }
    }
    var columnDef1 = [
        { headerName: "Remarks", field: "Remarks", cellClass: 'grid-align' },
        { headerName: "Asset Code", field: "ASSET_CODE", cellClass: 'grid-align' },
        { headerName: "Asset Name", field: "ASSET_NAME", cellClass: 'grid-align' },
        { headerName: "Main Category", field: "ASSET_MAIN_CAT", cellClass: 'grid-align' },
        { headerName: "Subcategory", field: "ASSET_SUB_CAT", cellClass: 'grid-align' },
        { headerName: "Brand", field: "ASSET_BRAND", cellClass: 'grid-align' },
        { headerName: "Model", field: "ASSET_MODEL", cellClass: 'grid-align' },
        { headerName: "Updated Location", field: "ASSET_LOC_CODE", cellClass: 'grid-align' },
        { headerName: "Status", field: "ASSET_STATUS", cellClass: 'grid-align' },

    ];

    $scope.gridOptions2 = {
        columnDefs: columnDef1,
        rowData: null,
        enableColResize: true,
        enableSorting: true,
        cellClass: 'grid-align',
        angularCompileRows: true,
        enableCellSelection: false,
        suppressHorizontalScroll: false,

        enableFilter: true,

        onReady: function () {
            $scope.gridOptions2.api.sizeColumnsToFit()
        }
    };
    function onFilterChanged(value) {
        $scope.gridOptions2.api.setQuickFilter(value);
    }

    $scope.UploadTransferAssets = function () {
        var transferInput = $('#file', $('#frmAddInventory'))[0];
        if (transferInput && transferInput.files && transferInput.files.length) {
            if (rejectInvalidAddAssetBulkExcel(transferInput.files[0], {
                allowedExtensions: ['xls', 'xlsx'],
                typeMessage: 'Upload Excel Format only (.xls, .xlsx)'
            }, transferInput)) {
                return;
            }
        }
        if ($('#file', $('#frmAddInventory')).val()) {
            progress(0, 'Loading...', true);
            var transferFile = transferInput && transferInput.files && transferInput.files[0];
            var filetype = transferFile
                ? transferFile.name.split('.').pop().toLowerCase()
                : $('#file', $('#frmAddInventory')).val().substring($('#file', $('#frmAddInventory')).val().lastIndexOf(".") + 1).toLowerCase();
            if (filetype === "xlsx" || filetype === "xls") {
                if (!window.FormData) {
                    redirect();
                }
                else {
                    var formData = new FormData();
                    var UplFile = $('#file')[0];
                    formData.append("UplFile", UplFile.files[0]);

                    // Check the number of rows in the Excel file
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                        var rowCount = XLSX.utils.decode_range(worksheet['!ref']).e.r + 1;

                        if (rowCount > 501) {
                            progress(0, '', false);
                            showNotification('error', 8, 'top-right', 'Upload limit exceeded. Please upload a file with up to 500 rows.');
                            return;
                        }

                        $.ajax({
                            url: UtilityService.path + "/api/AddAssetInventory/UploadTransferAssets",
                            type: "POST",
                            data: formData,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (response) {
                                if (response.data) {
                                    if (response.data.Table != null) {
                                        $scope.$apply(function () {
                                            $scope.griddata2 = response.data;
                                            $scope.gridOptions2.api.setRowData(response.data.Table);
                                            $scope.Transfergriddata = false;
                                            $('#file').val('');
                                            if (typeof window.resetAddAssetInventoryFileLabel === 'function') {
                                                window.resetAddAssetInventoryFileLabel(UplFile);
                                            }
                                            progress(0, '', false);
                                        });
                                        progress(0, '', false);
                                        showNotification('success', 8, 'top-right', response.Message);
                                    }
                                }
                                else {
                                    progress(0, '', false);
                                    $scope.gridOptions2.api.setRowData([]);
                                    showNotification('error', 8, 'top-right', toastErrorMessage(response));
                                }
                            }
                        });
                    };
                    reader.readAsBinaryString(UplFile.files[0]);
                }
            }
            else {

                progress(0, 'Loading...', false);
                showNotification('error', 8, 'top-right', 'Upload Excel Format only (.xls, .xlsx)');
            }

        }
        else {
            showNotification('error', 8, 'top-right', 'Select File To Upload');
        }
    }

    $scope.GenReport1 = function () {
        $scope.datavalue = [];
        angular.forEach($scope.gridOptions2.rowData, function (value, key) {
            $scope.datavalue.push({
                'Remarks': value.Remarks,
                'Asset Code': value.ASSET_CODE,
                'Asset Name': value.ASSET_NAME,
                'Main Category': value.ASSET_MAIN_CAT,
                'Subcategory': value.ASSET_SUB_CAT,
                'Brand': value.ASSET_BRAND,
                'Model': value.ASSET_MODEL,
                'Updated Location': value.ASSET_LOC_CODE,
                'Status': value.ASSET_STATUS
            });
        });
        var ws = XLSX.utils.json_to_sheet($scope.datavalue);
        ws['!cols'] = fitToColumn($scope.datavalue);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "AssetTransfferedDetails");
        XLSX.writeFile(wb, "Asset Transffered Details.xlsx");
    }
    $scope.selectAssetsModify = function () {
        AddAssetInventoryService.GetAssetCity().then(function (CityData) {
            $scope.AssetCITYList = CityData;
            $scope.AssetlOCATIONTransferList = [];
            AllCities = CityData;

            AddAssetInventoryService.GetAssetlOCATIONS_ForTransfer().then(function (LocationData) {
                $scope.AssetlOCATIONTransferList = LocationData;
                AllLocations = LocationData;

            }, function (error) {
                console.error('', error);
            });
        }, function (error) {
            console.error('', error);
        });
    }
    $scope.DownloadAssetsToModify = function () {
        progress(0, 'Loading...', true);
        if ($scope.AssetCITYList.CTY_CODE.length == 0) {
            progress(0, '', false);
            showNotification('error', 8, 'top-right', "Please select City");
        }
        else if ($scope.AssetlOCATIONTransferList.LCM_CODE.length == 0) {
            progress(0, '', false);
            showNotification('error', 8, 'top-right', "Please select Location");
        }
        else {
            $scope.dataobj =
            {
                CtyDetails: $scope.AssetCITYList.CTY_CODE,
                LocDetails: $scope.AssetlOCATIONTransferList.LCM_CODE
            };

            progress(0, 'Loading...', true);
            $http({
                url: UtilityService.path + '/api/AddAssetInventory/DownloadTemplate_ForModifyAssets',
                method: 'POST',
                responseType: 'arraybuffer',
                data: $scope.dataobj, //this is your json data string
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            }).then(function (data) {
                if (data.data.byteLength > 27) {
                    var blob = new Blob([data.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    save(blob, 'AssetsToModifyTemplate.xlsx');
                }
                else {
                    progress(0, '', false);
                    showNotification('error', 8, 'top-right', "No data Found");

                }
            }).catch(function () {
                progress(0, '', false);
            });
        }
    }
    $scope.UploadToModifyAssets = function () {
        var modifyInput = $('#file1', $('#frmAddInventory'))[0];
        if (modifyInput && modifyInput.files && modifyInput.files.length) {
            if (rejectInvalidAddAssetBulkExcel(modifyInput.files[0], {
                allowedExtensions: ['xls', 'xlsx'],
                typeMessage: 'Upload Excel Format only (.xls, .xlsx)'
            }, modifyInput)) {
                return;
            }
        }
        if ($('#file1', $('#frmAddInventory')).val()) {
            progress(0, 'Loading...', true);
            var modifyFile = modifyInput && modifyInput.files && modifyInput.files[0];
            var filetype = modifyFile
                ? modifyFile.name.split('.').pop().toLowerCase()
                : $('#file1', $('#frmAddInventory')).val().substring($('#file1', $('#frmAddInventory')).val().lastIndexOf(".") + 1).toLowerCase();
            if (filetype === "xlsx" || filetype === "xls") {
                if (!window.FormData) {
                    redirect();
                }
                else {
                    var formData = new FormData();
                    var ModifyFile = $('#file1')[0];
                    formData.append("ModifyFile", ModifyFile.files[0]);

                    // Check the number of rows in the Excel file
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, { type: 'binary' });
                        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                        var rowCount = XLSX.utils.decode_range(worksheet['!ref']).e.r + 1;

                        if (rowCount > 1001) {
                            progress(0, '', false);
                            showNotification('error', 8, 'top-right', 'Upload limit exceeded. Please upload a file with up to 1000 rows.');
                            return;
                        }

                        $.ajax({
                            url: UtilityService.path + "/api/AddAssetInventory/UploadToModifyAssets",
                            type: "POST",
                            data: formData,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (response) {
                                if (response.data) {
                                    if (response.data.Table != null) {
                                        $scope.$apply(function () {
                                            $scope.griddata3 = response.data;
                                            $scope.gridOptions3.api.setRowData([]);
                                            $scope.gridOptions3.api.setRowData(response.data.Table);
                                            $scope.Modifygriddata = false;
                                            $scope.gridOptions3.api.refreshHeader();
                                            $('#file1').val('');
                                            if (typeof window.resetAddAssetInventoryFileLabel === 'function') {
                                                window.resetAddAssetInventoryFileLabel(ModifyFile);
                                            }
                                            progress(0, '', false);
                                        });
                                        var remarksList = response.data.Table.map(row => (row.Remarks || '').toLowerCase().trim());
                                        var allSuccess = remarksList.every(r => r === 'asset modified successfully');
                                        var someSuccess = remarksList.some(r => r === 'asset modified successfully');

                                        progress(0, '', false);

                                        if (allSuccess) {
                                            showNotification('success', 8, 'top-right', 'All Assets Modified Successfully.');
                                        }
                                        else if (someSuccess) {
                                            showNotification('error', 8, 'top-right', 'Some Assets Were Uploaded Successfully. Please Check The Remarks.');
                                        }
                                        else {
                                            showNotification('error', 8, 'top-right', 'Upload Completed With Errors. Please Check The Remarks.');
                                        }
                                    }
                                }
                                else {
                                    progress(0, '', false);
                                    $scope.gridOptions3.api.setRowData([]);
                                    showNotification('error', 8, 'top-right', toastErrorMessage(response));
                                }
                            }
                        });
                    };
                    reader.readAsBinaryString(ModifyFile.files[0]);
                }
            }
            else {

                progress(0, 'Loading...', false);
                showNotification('error', 8, 'top-right', 'Upload Excel Format only (.xls, .xlsx)');
            }

        }
        else {
            showNotification('error', 8, 'top-right', 'Select File To Upload');
        }
    }

    var columnDef2 = [
        { headerName: "Remarks", field: "Remarks", cellClass: 'grid-align' },
        { headerName: "Asset Code", field: "ASSET_CODE", cellClass: 'grid-align' },
        { headerName: "Asset ID", field: "AAT_ID", cellClass: 'grid-align' },
        { headerName: "Main Category", field: "ASSET_MAIN_CAT", cellClass: 'grid-align' },
        { headerName: "Subcategory", field: "ASSET_SUB_CAT", cellClass: 'grid-align' },
        { headerName: "Brand", field: "ASSET_BRAND", cellClass: 'grid-align' },
        { headerName: "Model", field: "ASSET_MODEL", cellClass: 'grid-align' },
        { headerName: "Location", field: "ASSET_LOC_CODE", cellClass: 'grid-align' },
        { headerName: "Tower", field: "ASSET_TWR_CODE", cellClass: 'grid-align' },
        { headerName: "Floor", field: "ASSET_FLR_CODE", cellClass: 'grid-align' },
        { headerName: "Vendor", field: "AAT_AVR_CODE", cellClass: 'grid-align' },
        { headerName: "Serial No", field: "AAT_AST_SERIALNO", cellClass: 'grid-align' },
        { headerName: "Purchased Date", field: "PURCHASEDDATE", cellClass: 'grid-align' },
        { headerName: "Cost", field: "AAT_AST_COST", cellClass: 'grid-align' },
        { headerName: "Invoice Number", field: "AAT_INVOICE_NUM", cellClass: 'grid-align' },
        { headerName: "PO Number", field: "AAT_PO_NUMBER", cellClass: 'grid-align' },
        { headerName: "Description", field: "ASSET_DESCRIPTION", cellClass: 'grid-align' },
    ];

    $scope.gridOptions3 = {
        columnDefs: columnDef2,
        rowData: null,
        enableColResize: true,
        enableSorting: true,
        cellClass: 'grid-align',
        angularCompileRows: true,
        enableCellSelection: false,
        suppressHorizontalScroll: false,
        enableFilter: true,
        defaultColDef: {
            width: 150,
            resizable: true,
            sortable: true,
            filter: true
        },

        onGridReady: function () {
            $scope.gridOptions3.api.sizeColumnsToFit()
        }
    };
    function fitToModifyColumn(data) {
        const keys = Object.keys(data[0]);
        return keys.map(key => {
            const maxLength = Math.max(
                key.length,
                ...data.map(item => (item[key] ? item[key].toString().length : 0))
            );
            return { wch: maxLength + 2 };
        });
    }
    function onFilterChanged(value) {
        $scope.gridOptions3.api.setQuickFilter(value);
    }
    $scope.GenReport2 = function () {
        $scope.datavalue = [];
        angular.forEach($scope.gridOptions3.rowData, function (value, key) {
            $scope.datavalue.push({
                'Remarks': value.Remarks,
                'Asset Code': value.ASSET_CODE,
                'Asset Name': value.AAT_ID,
                'Main Category': value.ASSET_MAIN_CAT,
                'Subcategory': value.ASSET_SUB_CAT,
                'Brand': value.ASSET_BRAND,
                'Model': value.ASSET_MODEL,
                'Location': value.ASSET_LOC_CODE,
                'Tower': value.ASSET_TWR_CODE,
                'Floor': value.ASSET_FLR_CODE,
                'Vendor': value.AAT_AVR_CODE,
                'Serial No': value.AAT_AST_SERIALNO,
                'Purchased Date': value.PURCHASEDDATE,
                'Cost': value.AAT_AST_COST,
                'Invoice Number': value.AAT_INVOICE_NUM,
                'PO Number': value.AAT_PO_NUMBER,
                'Description': value.ASSET_DESCRIPTION
            });
        });
        var ws = XLSX.utils.json_to_sheet($scope.datavalue);
        ws['!cols'] = fitToModifyColumn($scope.datavalue);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "AssetModifiedDetails");
        XLSX.writeFile(wb, "Asset Modified Details.xlsx");
    }

    $scope.spareList = [];

    $scope.AddSparePart = function () {
        $scope.spareSubmitted = true;
        var idChk = $scope.checkInv($scope.SparePartID, 'spareId', true, 'Spare Part ID is required', 'Spare part ID allows letters, numbers, space / & only.', 50);
        if (!idChk.ok) {
            showNotification('error', 8, 'top-right', idChk.message);
            return;
        }
        var nameChk = $scope.checkInv($scope.SparePartName, 'remarks', true, 'Spare Part Name is required', 'Spare Part Name allows letters, numbers, space and . , ( ) / & : only.', 500);
        if (!nameChk.ok) {
            showNotification('error', 8, 'top-right', nameChk.message);
            return;
        }
        var qtyChk = $scope.checkInv($scope.Quantity, 'qty', true, 'Quantity must be a valid number greater than 0', 'Quantity allows numbers only.', 9);
        if (!qtyChk.ok || parseInt(qtyChk.value, 10) < 1) {
            showNotification('error', 8, 'top-right', qtyChk.ok ? 'Quantity must be a valid number greater than 0' : qtyChk.message);
            return;
        }
        var costChk = $scope.checkInv($scope.Cost, 'decimal', true, 'Cost must be a valid number greater than 0', 'Cost allows numbers and decimals only.', 15);
        if (!costChk.ok || parseFloat(costChk.value) <= 0) {
            showNotification('error', 8, 'top-right', costChk.ok ? 'Cost must be a valid number greater than 0' : costChk.message);
            return;
        }
        var totalCost = parseFloat(qtyChk.value) * parseFloat(costChk.value);
        var totalStr = (Math.round(totalCost * 100) / 100).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
        var totChk = $scope.checkInv($scope.TotalCost || totalStr, 'decimal', true, 'Please enter Total Cost.', 'Total Cost allows numbers and decimals only.', 15);
        if (!totChk.ok) {
            showNotification('error', 8, 'top-right', totChk.message);
            return;
        }

        var spareObj = {
            SparePartID: idChk.value,
            SparePartName: nameChk.value,
            Quantity: parseInt(qtyChk.value, 10),
            Cost: costChk.value,
            TotalCost: totChk.value
        };

        $scope.spareList.push(spareObj);
        $scope.gridOptions4.api.setRowData($scope.spareList);

        $scope.SparePartID = "";
        $scope.SparePartName = "";
        $scope.Quantity = "";
        $scope.Cost = "";
        $scope.TotalCost = "";
        $scope.spareSubmitted = false;
    };


    $scope.Remove = function (data) {
        if (!data) return;
        var index = -1;
        for (var i = 0; i < $scope.spareList.length; i++) {
            if ($scope.spareList[i].SparePartID === data.SparePartID &&
                $scope.spareList[i].SparePartName === data.SparePartName) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            $scope.spareList.splice(index, 1);
            if ($scope.gridOptions4.api) {
                $scope.gridOptions4.api.setRowData($scope.spareList);
            }
        }
    };

    $scope.$watch(function () {
        return [
            multiSelectProxyToken($scope.AssetMainCategoryList && $scope.AssetMainCategoryList.Assetmaincatcode),
            multiSelectProxyToken($scope.AssetSubCategoryList && $scope.AssetSubCategoryList.Assetsubncatcode),
            multiSelectProxyToken($scope.AssetBrandList && $scope.AssetBrandList.BrandCode),
            multiSelectProxyToken($scope.AssetModelList && $scope.AssetModelList.MdCode),
            multiSelectProxyToken($scope.AssetlOCATIONList && $scope.AssetlOCATIONList.lCMCODE),
            multiSelectProxyToken($scope.AssetTowerList && $scope.AssetTowerList.twr_CODE),
            multiSelectProxyToken($scope.AssetFloorList && $scope.AssetFloorList.flr_code),
            multiSelectProxyToken($scope.AssetVENDORList && $scope.AssetVENDORList.vendorCode),
            multiSelectProxyToken($scope.AssetTYPEList && $scope.AssetTYPEList.Assettype),
            multiSelectProxyToken($scope.AssetCompanyList && $scope.AssetCompanyList.AssettCompany),
            multiSelectProxyToken($scope.AssetCITYList && $scope.AssetCITYList.CTY_CODE),
            multiSelectProxyToken($scope.AssetlOCATIONTransferList && $scope.AssetlOCATIONTransferList.LCM_CODE),
            multiSelectProxyToken($scope.CostcenterList && $scope.CostcenterList.Cost_Center_Code)
        ].join('\x1e');
    }, function () {
        if (typeof $scope.refreshAddInventoryFormProxies === 'function') {
            $scope.refreshAddInventoryFormProxies();
        }
    });


}]);