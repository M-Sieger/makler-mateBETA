// 📄 CRMTool.jsx – Apple-inspirierter CRM-Bereich mit Card-Layout

import React from 'react';

import { toast } from 'react-hot-toast';

import CRMCard from '../../components/CRM/CRMCard';
import CRMExportLeads from '../../components/CRM/CRMExportLeads';
import LeadForm from '../../components/CRM/LeadForm';
import LeadList from '../../components/CRM/LeadList'; // ✅ Anzeige aller Leads
import useLocalStorageLeads from '../../hooks/useLocalStorageLeads';

export default function CRMTool() {
  // 📦 Hook für alle Lead-Funktionen
  const {
    leads,
    addLead,
    deleteLead,
    resetLeads,
    updateLead,
  } = useLocalStorageLeads();

  // ➕ Neuen Lead hinzufügen (mit Validierung)
  const handleAddLead = (lead) => {
    const { name, contact, type, status } = lead;

    // 🛡️ Pflichtfeldprüfung
    if (!name?.trim() || !contact?.trim() || !type || !status) {
      toast.error("❌ Bitte alle Pflichtfelder ausfüllen!");
      return;
    }

    // 🕓 Timestamp hinzufügen (zur Sicherheit)
    const leadWithTimestamp = {
      ...lead,
      createdAt: new Date().toISOString(),
    };

    addLead(leadWithTimestamp);
    toast.success("✅ Lead gespeichert!");
  };

  return (
    <div style={{ padding: '2rem' }}>
      <CRMCard title="📇 MaklerMate – CRM-Leads">
        {/* 📝 Formular für neue Leads */}
        <LeadForm onAddLead={handleAddLead} />

        {/* 📋 Liste aller Leads mit Bearbeiten + Löschen */}
        <LeadList
          leads={leads}
          onDelete={deleteLead}
          onUpdateLead={updateLead} // ✅ Wichtig: führt zu LeadRow → updateLead korrekt!
        />

        {/* 📤 Exportfunktionen (CSV, PDF etc.) */}
        <CRMExportLeads
          leads={leads}
          onReset={resetLeads}
          onUpdateLead={updateLead}
        />
      </CRMCard>
    </div>
  );
}
