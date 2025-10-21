"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClienteById = exports.getAllClientes = void 0;
const clienteService = __importStar(require("../services/cliente.service"));
const getAllClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield clienteService.getAllClientes();
        res.json(clientes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener clientes" });
    }
});
exports.getAllClientes = getAllClientes;
const getClienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield clienteService.getClienteById(id);
        if (!cliente)
            return res.status(404).json({ message: "Cliente no encontrado" });
        res.json(cliente);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener cliente" });
    }
});
exports.getClienteById = getClienteById;
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cliente = yield clienteService.createCliente(req.body);
        res.status(201).json(cliente);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear cliente y persona" });
    }
});
exports.createCliente = createCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield clienteService.updateCliente(id, req.body);
        res.status(200).json(cliente);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cliente no encontrado" });
    }
});
exports.updateCliente = updateCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield clienteService.deleteCliente(id);
        if (!cliente)
            return res.status(404).json({ message: "Cliente no encontrado" });
        res.status(200).json({ message: "Cliente eliminado exitosamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar cliente" });
    }
});
exports.deleteCliente = deleteCliente;
