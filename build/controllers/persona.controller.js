"use strict";
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
exports.deletePersona = exports.updatePersona = exports.createPersona = exports.getPersonaById = exports.getAllPersonas = void 0;
const getAllPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Lista de personas" });
});
exports.getAllPersonas = getAllPersonas;
const getPersonaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.json({ message: `Persona ${id}` });
});
exports.getPersonaById = getPersonaById;
const createPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Persona creada", data: req.body });
});
exports.createPersona = createPersona;
const updatePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.json({ message: `Persona ${id} actualizada`, data: req.body });
});
exports.updatePersona = updatePersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.json({ message: `Persona ${id} eliminada` });
});
exports.deletePersona = deletePersona;
