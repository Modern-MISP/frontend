export const TABLE_DATA = [
  {
    version: '0.1',
    blocking: false,
    id: 'add_eventblocklist_entry',
    name: 'Add Event Blocklist entry',
    description: 'Create a new entry in the Event blocklist table',
    icon: 'ban',
    inputs: 1,
    outputs: 1,
    support_filters: false,
    expect_misp_core_format: true,
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    module_type: 'action',
    disabled: true
  },
  {
    version: '0.2',
    blocking: false,
    id: 'assign_country',
    name: 'Assign country',
    description: 'Add or remove country Galaxy Cluster based on provided data',
    icon: 'globe',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,

    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    module_type: 'action',
    disabled: true
  },
  {
    id: 'attach-enrichment',
    name: 'Attach enrichment',
    version: '0.3',
    description: 'Attach selected enrichment result to Attributes.',
    icon: 'asterisk',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'modules',
        label: 'Modules',
        type: 'picker',
        multiple: true,
        disabled: false,
        options: [
          '',
          'abuseipdb',
          'apiosintds',
          'apivoid',
          'assemblyline_query',
          'assemblyline_submit',
          'backscatter_io',
          'bgpranking',
          'btc_scam_check',
          'btc_steroids',
          'cef_export',
          'censys_enrich',
          'circl_passivedns',
          'circl_passivessl',
          'cisco_firesight_manager_ACL_rule_export',
          'clamav',
          'cluster25_expand',
          'cof2misp',
          'countrycode',
          'cpe',
          'crowdsec',
          'crowdstrike_falcon',
          'csvimport',
          'cuckoo_submit',
          'cuckooimport',
          'cve',
          'cve_advanced',
          'cytomic_orion',
          'dbl_spamhaus',
          'defender_endpoint_export',
          'dns',
          'docx_enrich',
          'domaintools',
          'email_import',
          'eql',
          'eupi',
          'extract_url_components',
          'farsight_passivedns',
          'geoip_asn',
          'geoip_city',
          'geoip_country',
          'goamlexport',
          'goamlimport',
          'google_safe_browsing',
          'google_search',
          'greynoise',
          'hashdd',
          'hashlookup',
          'hibp',
          'html_to_markdown',
          'hyasinsight',
          'import_blueprint',
          'intel471',
          'ipasn',
          'ipinfo',
          'ipqs_fraud_and_risk_scoring',
          'iprep',
          'jinja_template_rendering',
          'joe_import',
          'joesandbox_query',
          'joesandbox_submit',
          'lastline_import',
          'lastline_query',
          'lastline_submit',
          'liteexport',
          'macaddress_io',
          'macvendors',
          'malwarebazaar',
          'mass_eql_export',
          'mattermost',
          'mcafee_insights_enrich',
          'mispjson',
          'mmdb_lookup',
          'mwdb',
          'nexthinkexport',
          'ocr',
          'ocr_enrich',
          'ods_enrich',
          'odt_enrich',
          'onyphe',
          'onyphe_full',
          'openiocimport',
          'osqueryexport',
          'otx',
          'passive-ssh',
          'passivetotal',
          'pdf_enrich',
          'pdfexport',
          'pptx_enrich',
          'qintel_qsentry',
          'qrcode',
          'ransomcoindb',
          'rbl',
          'recordedfuture',
          'reversedns',
          'securitytrails',
          'shodan',
          'sigma_queries',
          'sigma_syntax_validator',
          'sigmf-expand',
          'socialscan',
          'sophoslabs_intelix',
          'sourcecache',
          'stix2_pattern_syntax_validator',
          'stiximport',
          'taxii21',
          'testaction',
          'testexport',
          'testimport',
          'threatStream_misp_export',
          'threat_connect_export',
          'threatanalyzer_import',
          'threatcrowd',
          'threatfox',
          'threatminer',
          'trustar_enrich',
          'url_import',
          'urlhaus',
          'urlscan',
          'variotdbs',
          'virustotal',
          'virustotal_collections',
          'virustotal_public',
          'vmray_import',
          'vmray_submit',
          'vmray_summary_json_import',
          'vmware_nsx',
          'vt_graph',
          'vulndb',
          'vulners',
          'whois',
          'whoisfreaks',
          'wiki',
          'xforceexchange',
          'xlsx_enrich',
          'yara_query',
          'yara_syntax_validator',
          'yeti'
        ],
        picker_options: []
      }
    ],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    version: '0.1',
    id: 'attach-warninglist',
    name: 'Attach warninglist',
    description: 'Attach selected warninglist result.',
    icon: 'exclamation-triangle',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'warninglists',
        label: 'Warninglists',
        type: 'select',
        options: ['ALL', 'List of known Wikimedia address ranges', 'University domains'],
        default: 'ALL'
      }
    ],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: false
  },
  {
    version: '0.1',
    blocking: false,
    id: 'attribute_ids_flag_operation',
    name: 'Attribute IDS Flag operation',
    description: 'Toggle or remove the IDS flag on selected attributes.',
    icon: 'edit',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'action',
        label: 'To IDS Flag',
        type: 'select',
        options: {
          add: 'Toggle IDS flag',
          remove: 'Remove IDS flag'
        },
        default: 'add'
      }
    ],
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    version: '0.1',
    blocking: false,
    id: 'Module_attribute_comment_operation',
    name: 'Attribute comment operation',
    description: "Set the Attribute's comment to the selected value",
    icon: 'edit',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'comment',
        label: 'Comment',
        type: 'textarea',
        placeholder: 'Comment to be set'
      }
    ],
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: false
  },
  {
    version: '0.1',
    blocking: false,
    id: 'attribute_edition_operation',
    name: 'Attribute edition operation',
    description: 'Base module allowing to modify attribute',
    icon: 'edit',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [],
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    blocking: false,
    disabled: false,
    id: 'blueprint-action-module',
    name: 'Blueprint action module',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    icon: 'shapes',
    inputs: 1,
    outputs: 1,
    params: [],
    is_misp_module: false,
    is_custom: true,
    expect_misp_core_format: false,
    version: '0.1',
    icon_class: '',
    multiple_output_connection: false,
    support_filters: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action'
  },
  {
    id: 'enrich-event',
    name: 'Enrich Event',
    version: '0.2',
    description: 'Enrich all Attributes contained in the Event with the provided module.',
    icon: 'asterisk',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'modules',
        label: 'Modules',
        type: 'select',
        options: [
          '',
          'abuseipdb',
          'apiosintds',
          'apivoid',
          'assemblyline_query',
          'assemblyline_submit',
          'backscatter_io',
          'bgpranking',
          'btc_scam_check',
          'btc_steroids',
          'cef_export',
          'censys_enrich',
          'circl_passivedns',
          'circl_passivessl',
          'cisco_firesight_manager_ACL_rule_export',
          'clamav',
          'cluster25_expand',
          'cof2misp',
          'countrycode',
          'cpe',
          'crowdsec',
          'crowdstrike_falcon',
          'csvimport',
          'cuckoo_submit',
          'cuckooimport',
          'cve',
          'cve_advanced',
          'cytomic_orion',
          'dbl_spamhaus',
          'defender_endpoint_export',
          'dns',
          'docx_enrich',
          'domaintools',
          'email_import',
          'eql',
          'eupi',
          'extract_url_components',
          'farsight_passivedns',
          'geoip_asn',
          'geoip_city',
          'geoip_country',
          'goamlexport',
          'goamlimport',
          'google_safe_browsing',
          'google_search',
          'greynoise',
          'hashdd',
          'hashlookup',
          'hibp',
          'html_to_markdown',
          'hyasinsight',
          'import_blueprint',
          'intel471',
          'ipasn',
          'ipinfo',
          'ipqs_fraud_and_risk_scoring',
          'iprep',
          'jinja_template_rendering',
          'joe_import',
          'joesandbox_query',
          'joesandbox_submit',
          'lastline_import',
          'lastline_query',
          'lastline_submit',
          'liteexport',
          'macaddress_io',
          'macvendors',
          'malwarebazaar',
          'mass_eql_export',
          'mattermost',
          'mcafee_insights_enrich',
          'mispjson',
          'mmdb_lookup',
          'mwdb',
          'nexthinkexport',
          'ocr',
          'ocr_enrich',
          'ods_enrich',
          'odt_enrich',
          'onyphe',
          'onyphe_full',
          'openiocimport',
          'osqueryexport',
          'otx',
          'passive-ssh',
          'passivetotal',
          'pdf_enrich',
          'pdfexport',
          'pptx_enrich',
          'qintel_qsentry',
          'qrcode',
          'ransomcoindb',
          'rbl',
          'recordedfuture',
          'reversedns',
          'securitytrails',
          'shodan',
          'sigma_queries',
          'sigma_syntax_validator',
          'sigmf-expand',
          'socialscan',
          'sophoslabs_intelix',
          'sourcecache',
          'stix2_pattern_syntax_validator',
          'stiximport',
          'taxii21',
          'testaction',
          'testexport',
          'testimport',
          'threatStream_misp_export',
          'threat_connect_export',
          'threatanalyzer_import',
          'threatcrowd',
          'threatfox',
          'threatminer',
          'trustar_enrich',
          'url_import',
          'urlhaus',
          'urlscan',
          'variotdbs',
          'virustotal',
          'virustotal_collections',
          'virustotal_public',
          'vmray_import',
          'vmray_submit',
          'vmray_summary_json_import',
          'vmware_nsx',
          'vt_graph',
          'vulndb',
          'vulners',
          'whois',
          'whoisfreaks',
          'wiki',
          'xforceexchange',
          'xlsx_enrich',
          'yara_query',
          'yara_syntax_validator',
          'yeti'
        ]
      }
    ],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: false
  },
  {
    version: '0.1',
    blocking: false,
    id: 'Module_event_distribution_operation',
    name: 'Event distribution operation',
    description: "Set the Event's distribution to the selected level",
    icon: 'edit',
    inputs: 1,
    outputs: 1,
    support_filters: false,
    expect_misp_core_format: true,
    params: [
      {
        id: 'freeze',
        label: 'Preserve timestamp and published state',
        type: 'select',
        options: {
          modify: 'Modify timestamp and unpublish',
          freeze: 'Freeze timestamp and keep published state'
        },
        default: 'modify'
      },
      {
        id: 'distribution',
        label: 'Distribution',
        type: 'select',
        default: '0',
        options: [
          {
            name: 'Organisation',
            value: 0
          },
          {
            name: 'Community',
            value: 1
          },
          {
            name: 'Connected',
            value: 2
          },
          {
            name: 'All',
            value: 3
          },
          {
            name: ' Sharing Group',
            value: 4
          }
        ],
        placeholder: 'Pick a distribution'
      },
      {
        id: 'sharing_group_id',
        label: 'Sharing Groups',
        type: 'picker',
        multiple: false,
        options: [],
        default: [],
        placeholder: 'Pick a sharing group',
        display_on: {
          distribution: '4'
        }
      }
    ],
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: false
  },
  {
    id: 'ms-teams-webhook',
    name: 'MS Teams Webhook',
    version: '0.5',
    description:
      'Perform callbacks to the MS Teams webhook provided by the "Incoming Webhook" connector',
    icon_path: 'MS_Teams.png',
    inputs: 1,
    outputs: 1,
    support_filters: false,
    params: [
      {
        id: 'url',
        label: 'MS Teams Webhook URL',
        type: 'input',
        placeholder: 'https://example.com/test'
      },
      {
        id: 'content_type',
        label: 'Content type',
        type: 'select',
        default: 'form',
        options: {
          form: 'application/x-www-form-urlencoded'
        }
      },
      {
        id: 'data_extraction_path',
        label: 'Data extraction path',
        type: 'hashpath',
        default: '',
        placeholder: 'Attribute.{n}.AttributeTag.{n}.Tag.name'
      }
    ],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    expect_misp_core_format: false,
    icon: '',
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    id: 'publish-event',
    name: 'Publish Event',
    version: '0.1',
    description: 'Publish an Event in the context of the workflow',
    icon: 'upload',
    inputs: 1,
    outputs: 1,
    params: [],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    expect_misp_core_format: false,
    icon_class: '',
    multiple_output_connection: false,
    support_filters: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    blocking: false,
    id: 'push-zmq',
    name: 'Push to ZMQ',
    version: '0.2',
    description: 'Push to the ZMQ channel',
    icon_path: 'zeromq.png',
    inputs: 1,
    outputs: 1,
    params: [
      {
        id: 'data_extraction_path',
        label: 'Data extraction path',
        type: 'hashpath',
        default: '',
        placeholder: 'Attribute.{n}.AttributeTag.{n}.Tag.name'
      }
    ],
    is_misp_module: false,
    is_custom: false,
    expect_misp_core_format: false,
    icon: '',
    icon_class: '',
    multiple_output_connection: false,
    support_filters: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    id: 'send-log-mail',
    name: 'Send Log Mail',
    description:
      'Allow to send a Mail to a list or recipients, based on a Log trigger. Requires functional misp-modules to be functional.',
    icon: 'envelope',
    inputs: 1,
    outputs: 1,
    support_filters: false,
    params: [
      {
        id: 'recipients',
        label: 'Recipients',
        type: 'picker',
        multiple: true,
        options: [
          'All accounts',
          'All admins',
          'Org admins',
          'admin@admin.test',
          'uzjcs@student.kit.edu',
          'unjky@student.kit.edu',
          'user@example.com',
          'user2@example.com',
          'uqney@student.kit.edu'
        ],
        default: ['All admins']
      },
      {
        id: 'mail_template_subject',
        label: 'Mail template subject',
        type: 'textarea',
        placeholder: 'The **template** will be rendered using *Jinja2*!'
      },
      {
        id: 'mail_template_body',
        label: 'Mail template body',
        type: 'textarea',
        placeholder: 'The **template** will be rendered using *Jinja2*!'
      }
    ],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    expect_misp_core_format: false,
    version: '0.1',
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    id: 'send-mail',
    name: 'Send Mail',
    description:
      'Allow to send a Mail to a list or recipients. Requires functional misp-modules to be functional.',
    icon: 'envelope',
    inputs: 1,
    outputs: 1,
    support_filters: false,
    params: [
      {
        id: 'recipients',
        label: 'Recipients',
        type: 'picker',
        multiple: true,
        options: [
          'All accounts',
          'All admins',
          'admin@admin.test',
          'uzjcs@student.kit.edu',
          'unjky@student.kit.edu',
          'user@example.com',
          'user2@example.com',
          'uqney@student.kit.edu'
        ],
        default: ['All admins']
      },
      {
        id: 'mail_template_subject',
        label: 'Mail template subject',
        type: 'textarea',
        placeholder: 'The **template** will be rendered using *Jinja2*!'
      },
      {
        id: 'mail_template_body',
        label: 'Mail template body',
        type: 'textarea',
        placeholder: 'The **template** will be rendered using *Jinja2*!'
      }
    ],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    expect_misp_core_format: false,
    version: '0.1',
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    id: 'splunk-hec-export',
    name: 'Splunk HEC export',
    version: '0.2',
    description:
      "Export Event Data to Splunk HTTP Event Collector. Due to the potential high amount of requests, it's recommanded to put this module after a `concurrent_task` logic module.",
    icon_path: 'Splunk.png',
    support_filters: false,
    expect_misp_core_format: true,
    params: [
      {
        id: 'url',
        label: 'HEC URL',
        type: 'input',
        placeholder: 'https://splunk:8088/services/collector/event'
      },
      {
        id: 'verify_tls',
        label: 'Verify HTTPS Certificate',
        type: 'select',
        options: {
          '0': 'False',
          '1': 'True'
        },
        default: 1
      },
      {
        id: 'hec_token',
        label: 'HEC Token',
        type: 'input',
        placeholder: '00000000-0000-0000-000000000000'
      },
      {
        id: 'source_type',
        label: 'Source Type',
        type: 'input',
        default: '',
        placeholder: 'misp:event'
      },
      {
        id: 'event_per_attribute',
        label: 'Create one Splunk Event per Attribute',
        type: 'select',
        options: {
          '0': 'False',
          '1': 'True'
        },
        default: 0
      },
      {
        id: 'data_extraction_model',
        label: 'Data extraction model (JSON)',
        type: 'textarea',
        default: '',
        placeholder: '{ "EventInfo": "Event.info", "AttributeValue": "Event.Attribute.{n}.value"}'
      }
    ],
    outputs: 0,
    inputs: 1,
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    icon: '',
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    blocking: true,
    id: 'stop-execution',
    name: 'Stop execution',
    description:
      'Essentially stops the execution for blocking workflows. Do nothing for non-blocking ones',
    icon: 'ban',
    inputs: 1,
    outputs: 0,
    params: [],
    is_misp_module: false,
    is_custom: false,
    expect_misp_core_format: false,
    version: '0.1',
    icon_class: '',
    multiple_output_connection: false,
    support_filters: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    version: '0.1',
    blocking: false,
    id: 'tag_replacement_pap',
    name: 'Tag Replacement - PAP',
    description: 'Attach a tag (or substitue) a tag by another for the PAP taxonomy',
    icon: 'tags',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'scope',
        label: 'Scope',
        type: 'select',
        options: {
          event: 'Event',
          attribute: 'Attributes',
          all: 'All'
        },
        default: 'event'
      },
      {
        id: 'remove_substituted',
        label: 'Removed substituted tag',
        type: 'select',
        default: '1',
        options: {
          no: 'No',
          yes: 'Yes'
        }
      },
      {
        id: 'locality',
        label: 'Tag Locality',
        type: 'select',
        options: {
          local: 'Local',
          global: 'Global'
        },
        default: 'local'
      },
      {
        id: 'relationship_type',
        label: 'Relationship Type',
        type: 'input',
        display_on: {
          action: 'add'
        }
      }
    ],
    searchRegex:
      '/(\\w*pap\\w*|permissible\\W+actions\\W+protocol)([:\\s\\-=]{1,2})"?(?P<predicate>white|clear|green|amber|red)"?/i',
    substitutionTemplate: '',
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    version: '0.1',
    blocking: false,
    id: 'tag_replacement_tlp',
    name: 'Tag Replacement - TLP',
    description: 'Attach a tag (or substitue) a tag by another for the TLP taxonomy',
    icon: 'tags',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'scope',
        label: 'Scope',
        type: 'select',
        options: {
          event: 'Event',
          attribute: 'Attributes',
          all: 'All'
        },
        default: 'event'
      },
      {
        id: 'remove_substituted',
        label: 'Removed substituted tag',
        type: 'select',
        default: '1',
        options: {
          no: 'No',
          yes: 'Yes'
        }
      },
      {
        id: 'locality',
        label: 'Tag Locality',
        type: 'select',
        options: {
          local: 'Local',
          global: 'Global'
        },
        default: 'local'
      },
      {
        id: 'relationship_type',
        label: 'Relationship Type',
        type: 'input',
        display_on: {
          action: 'add'
        }
      }
    ],
    searchRegex:
      '/(\\w*tlp\\w*|traffic\\W+light\\W+protocol)([:\\s\\-=]{1,2})"?(?P<predicate>white|clear|green|amber|amber\\+strict|red)"?/i',
    substitutionTemplate: '',
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    version: '0.1',
    blocking: false,
    id: 'tag_replacement_generic',
    name: 'Tag Replacement Generic',
    description: 'Toggle or remove the IDS flag on selected attributes.',
    icon: 'tags',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'scope',
        label: 'Scope',
        type: 'select',
        options: {
          event: 'Event',
          attribute: 'Attributes',
          all: 'All'
        },
        default: 'event'
      },
      {
        id: 'remove_substituted',
        label: 'Removed substituted tag',
        type: 'select',
        default: '1',
        options: {
          no: 'No',
          yes: 'Yes'
        }
      },
      {
        id: 'locality',
        label: 'Tag Locality',
        type: 'select',
        options: {
          local: 'Local',
          global: 'Global'
        },
        default: 'local'
      },
      {
        id: 'relationship_type',
        label: 'Relationship Type',
        type: 'input',
        display_on: {
          action: 'add'
        }
      }
    ],
    searchRegex: '',
    substitutionTemplate: '',
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    version: '0.2',
    blocking: false,
    id: 'tag_operation',
    name: 'Tag operation',
    description: 'Add or remove tags on Event or Attributes.',
    icon: 'tags',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    expect_misp_core_format: true,
    params: [
      {
        id: 'scope',
        label: 'Scope',
        type: 'select',
        options: {
          event: 'Event',
          attribute: 'Attributes'
        },
        default: 'event'
      },
      {
        id: 'action',
        label: 'Action',
        type: 'select',
        options: {
          add: 'Add Tags',
          remove: 'Remove Tags'
        },
        default: 'add'
      },
      {
        id: 'locality',
        label: 'Tag Locality',
        type: 'select',
        options: {
          local: 'Local',
          global: 'Global',
          any: 'Any'
        },
        default: 'local'
      },
      {
        id: 'tags',
        label: 'Tags',
        type: 'picker',
        multiple: true,
        options: [
          '\tmalware_classification:malware-category="Botnet"',
          ' C2',
          ' Cobalt Strike Beacon',
          ' DLL Dropper',
          ' Decoy',
          ' Doc(x)',
          ' Download',
          ' Flash',
          ' Malicious Batch Script',
          ' Ransomware',
          ' Smoke Loader',
          ' VBS Downloader',
          '"Lingarder Limited"',
          '.kz Domain',
          '10291029JSJUYNHG',
          'ANEL',
          'APT',
          'ARTILDA CONSULTING LIMITED',
          'Actor: APT28',
          'Actor: Lazarus',
          'Actor: Sofacy',
          'Adware',
          'Anchor',
          'Android Malware',
          'Autoit',
          'BR_CTI_Investigar',
          'Backdoor',
          'Banker',
          'Banker: Dridex',
          'Banker: Gozi ISFB v2',
          'Banker: TrickBot',
          'Bokbot',
          'Botnet "3101"',
          'CERT-XLM:malicious-code="spyware-rat"',
          'CERT-XLM:malicious-code="trojan-malware"',
          'CHCHES',
          'Cobalt Strike',
          'Country: Pakistan',
          'DOTRUNPEX',
          'DPRK',
          'DROPPER DLLS',
          'Decoy',
          'DescriptionTechnique',
          'Digital Signature',
          'Download',
          'Downloader',
          'Dridex',
          'Emotet',
          'FindPOS',
          'FindStr',
          'IcedID',
          'Intel 471:GIR="1.2.2 - Ransomware-as-a-Service (RaaS)"',
          'Keylogger',
          'Loader',
          'Lokibot',
          'MalSpam',
          'Malvertising',
          'Malware: PowerRatankba,b',
          'Malware: Zebrocy',
          'Memory Scraper',
          'Mirai',
          'OSINT',
          'PAP:CLEAR',
          'PAP:WHITE',
          'PDF',
          'Panda Banker',
          'PasteBin: MALWAREMESSIAGH',
          'Payload',
          'Phishing',
          'PoSeidon',
          'Point-of-Sale',
          'PowerRatankba',
          'PowerShell Installer',
          'PowerView',
          'Powershell',
          'Powershell Empire',
          'PyXie',
          'RAT',
          'RAWINPUT',
          'REDLEAVES',
          'RTF',
          'Ransomware',
          'Remcos RAT',
          'Ruse: Job Application',
          'Ryuk',
          'SCRIPTLET',
          'SMB',
          'Signed',
          'Source:Urlscan.io',
          'Stage 1',
          'Stage 2',
          'Stantinko',
          'Symantec',
          'TerraLoader',
          'Thawte',
          'Threat Source:OSINT',
          'Threat Type:APT',
          'Threat Type:RAT',
          'Threat:Sofacy/APT28',
          'Trj=Doublepulsar',
          'UPPERCUT',
          'Ursnif',
          'VT:More than 10 URLs detected',
          'Version 15.10',
          'Version: 1057',
          'Word Doc(x)',
          'Zero Day',
          'admiralty-scale:information-credibility="1"',
          'admiralty-scale:information-credibility="2"',
          'admiralty-scale:information-credibility="3"',
          'admiralty-scale:information-credibility="6"',
          'admiralty-scale:source-reliability="a"',
          'admiralty-scale:source-reliability="b"',
          'admiralty-scale:source-reliability="c"',
          'admiralty-scale:source-reliability="f"',
          'adversary:infrastructure-action="take-down"',
          'adversary:infrastructure-state="active"',
          'adversary:infrastructure-status="compromised"',
          'adversary:infrastructure-type="exploit-distribution-point"',
          'adversary:infrastructure-type="panel"',
          'adversary:infrastructure-type="proxy"',
          'adversary:infrastructure-type="unknown"',
          'attack-pattern:name="password brute forcing"',
          'cccs:malware_classification="webshell"',
          'cert-fr:fiabilite="Bonne"',
          'cert-ist:enriched',
          'cert-ist:ioc_accuracy="high"',
          'cert-ist:ioc_accuracy="medium"',
          'cert-ist:malware_type="Keylogger"',
          'cert-ist:malware_type="Stealer"',
          'cert-ist:malware_type="Webshell"',
          'cert-ist:threat_level="low"',
          'cert-ist:threat_level="medium"',
          'cert-ist:threat_targeted_region="Western Europe"',
          'cert-ist:threat_targeted_sector="Academic and Research"',
          'cert-ist:threat_targeted_sector="Finance"',
          'cert-ist:threat_targeted_sector="Gov"',
          'cert-ist:threat_targeted_system="Windows"',
          'cert-ist:threat_type="apt"',
          'cert-ist:threat_type="malware_outbreak"',
          'certsi:critical-sector="energy"',
          'circl:incident-classification="cryptojacking"',
          'circl:incident-classification="information-leak"',
          'circl:incident-classification="malware"',
          'circl:incident-classification="phishing"',
          'circl:incident-classification="scam"',
          'circl:incident-classification="spam"',
          'circl:incident-classification="system-compromise"',
          'circl:incident-classification="vulnerability"',
          'circl:topic="finance"',
          'circl:topic="ict"',
          'circl:topic="industry"',
          'circl:topic="services"',
          'collaborative-intelligence:request="historical-information"',
          'collaborative-intelligence:request="more-samples"',
          'collaborative-intelligence:request="related-samples"',
          'collaborative-intelligence:request="sample"',
          'core-parser.dll',
          'cossi:RechercheSourceOuverte="Autorisee"',
          'cossi:TLP="white"',
          'cossi:fiabilite="Bonne"',
          'cyber-threat-framework:Effect/Consequence="destroy-hardware-software-or-data"',
          'cyber-threat-framework:Engagement="exploit-vulnerabilities"',
          'cycat:scope="detection"',
          'cycat:scope="investigation"',
          'cycat:type="fingerprint"',
          'ddos:type="amplification-attack"',
          'ddos:type="flooding-attack"',
          'diamond-model:Adversary',
          'diamond-model:Capability',
          'diamond-model:Infrastructure',
          'dnc:infrastructure-type="exploit-kit"',
          'dnc:malware-type="CoinMiner"',
          'dnc:malware-type="Ransomware"',
          'ecsirt:availability="ddos"',
          'ecsirt:fraud="phishing"',
          'ecsirt:intrusions="application-compromise"',
          'ecsirt:intrusions="backdoor"',
          'ecsirt:intrusions="compromised"',
          'ecsirt:malicious-code="c&c"',
          'ecsirt:malicious-code="malware"',
          'ecsirt:malicious-code="ransomware"',
          'ecsirt:malicious-code="trojan"',
          'emotet:epoch="1"',
          'enisa:nefarious-activity-abuse="DNS-poisoning-or-DNS-spoofing-or-DNS-Manipulations"',
          'enisa:nefarious-activity-abuse="exploits-exploit-kits"',
          'enisa:nefarious-activity-abuse="infected-trusted-mobile-apps"',
          'enisa:nefarious-activity-abuse="mobile-malware"',
          'enisa:nefarious-activity-abuse="ransomware"',
          'enisa:nefarious-activity-abuse="remote-access-tool"',
          'enisa:nefarious-activity-abuse="spear-phishing-attacks"',
          'estimative-language:confidence-in-analytic-judgment="high"',
          'estimative-language:confidence-in-analytic-judgment="low"',
          'estimative-language:confidence-in-analytic-judgment="moderate"',
          'estimative-language:likelihood-probability="almost-certain"',
          'estimative-language:likelihood-probability="likely"',
          'estimative-language:likelihood-probability="roughly-even-chance"',
          'estimative-language:likelihood-probability="unlikely"',
          'estimative-language:likelihood-probability="very-likely"',
          'europol-event:c&c-server-hosting',
          'europol-event:hosting-phishing-sites',
          'europol-incident:availability="dos-ddos"',
          'europol-incident:information-security="unauthorized-access"',
          'europol-incident:information-security="unauthorized-modification"',
          'europol-incident:malware="c&c"',
          'expansion:whois-registrant-email',
          'feedly:source="Sekoia.io Blog"',
          'fr-classif:non-classifiees="NON-CLASSIFIEES"',
          'hau de gang nei',
          'honeypot-basic:containment="block"',
          'honeypot-basic:data-capture="attacks"',
          'inthreat:event-src="feed-osint"',
          'keylogger/infostealer',
          'kill-chain:Actions on Objectives',
          'kill-chain:Command and Control',
          'kill-chain:Delivery',
          'kill-chain:Installation',
          'kill-chain:Reconnaissance',
          'maec-malware-behavior:maec-malware-behavior="mine-for-cryptocurrency"',
          'maec-malware-capabilities:maec-malware-capability="command-and-control"',
          'maec-malware-capabilities:maec-malware-capability="machine-access-control"',
          'maldoc',
          'malware:emotet',
          'malware_classification:malware-category="Botnet"',
          'malware_classification:malware-category="Downloader"',
          'malware_classification:malware-category="Ransomware"',
          'malware_classification:malware-category="Rootkit"',
          'malware_classification:malware-category="Spyware"',
          'malware_classification:malware-category="Trojan"',
          'malware_classification:memory-classification="user-process"',
          'malware_classification:obfuscation-technique="tunneling"',
          'malware_classification:payload-classification="dropper"',
          'misp:confidence-level="completely-confident"',
          'misp:confidence-level="usually-confident"',
          'monarc-threat:compromise-of-information="malware-infection"',
          'monarc-threat:unauthorised-actions="corruption-of-data"',
          'ms-caro-malware-full:malware-family="Banker"',
          'ms-caro-malware-full:malware-family="Nitol"',
          'ms-caro-malware-full:malware-family="Redirector"',
          'ms-caro-malware-full:malware-family="ShellCode"',
          'ms-caro-malware-full:malware-platform="AndroidOS"',
          'ms-caro-malware-full:malware-platform="Linux"',
          'ms-caro-malware-full:malware-platform="MacOS_X"',
          'ms-caro-malware-full:malware-platform="VBA"',
          'ms-caro-malware-full:malware-type="Backdoor"',
          'ms-caro-malware-full:malware-type="Joke"',
          'ms-caro-malware-full:malware-type="Ransom"',
          'ms-caro-malware-full:malware-type="RemoteAccess"',
          'ms-caro-malware-full:malware-type="Trojan"',
          'ms-caro-malware-full:malware-type="TrojanDropper"',
          'ms-caro-malware-full:malware-type="TrojanProxy"',
          'ms-caro-malware:malware-platform="AndroidOS"',
          'ms-caro-malware:malware-platform="Linux"',
          'ms-caro-malware:malware-platform="MacOS_X"',
          'ms-caro-malware:malware-platform="Python"',
          'ms-caro-malware:malware-platform="Unix"',
          'ms-caro-malware:malware-platform="Win32"',
          'ms-caro-malware:malware-platform="Win64"',
          'ms-caro-malware:malware-type="Backdoor"',
          'ms-caro-malware:malware-type="DDoS"',
          'ms-caro-malware:malware-type="Exploit"',
          'ms-caro-malware:malware-type="HackTool"',
          'ms-caro-malware:malware-type="Ransom"',
          'ms-caro-malware:malware-type="RemoteAccess"',
          'ms-caro-malware:malware-type="Spammer"',
          'ms-caro-malware:malware-type="Tool"',
          'ms-caro-malware:malware-type="Trojan"',
          'ms-caro-malware:malware-type="TrojanDownloader"',
          'ncsc-nl-ndn:feed="generic"',
          'ncsc-nl-ndn:feed="selected"',
          'osint:certainty="100"',
          'osint:certainty="50"',
          'osint:certainty="75"',
          'osint:certainty="93"',
          'osint:lifetime="perpetual"',
          'osint:source-type="automatic-analysis"',
          'osint:source-type="automatic-collection"',
          'osint:source-type="block-or-filter-list"',
          'osint:source-type="blog-post"',
          'osint:source-type="manual-analysis"',
          'osint:source-type="microblog-post"',
          'osint:source-type="pastie-website"',
          'osint:source-type="source-code-repository"',
          'osint:source-type="technical-report"',
          'ostap',
          'poshc2 beacon',
          'racoon',
          'report:5ZvWjgDgRhuD1zVgDT7-cg',
          'retention:1m',
          'retention:expired',
          'riskiq:threat-name="scam-scareware"',
          'riskiq:threat-type="c2"',
          'riskiq:threat-type="credit-card-stealer"',
          'riskiq:threat-type="exploit-kit"',
          'riskiq:threat-type="scam"',
          'rkey: "wearenotcobaltthanks"',
          'rsit:availability="ddos"',
          'smart-airports-threats:malicious-actions="social-attacks-phishing-spearphishing"',
          'source:OSINT',
          'target:healthcare',
          'tlp:amber',
          'tlp:clear',
          'tlp:green',
          'tlp:white',
          'tor:tor-relay-type="exit-relay"',
          'trickbot',
          'type:OSINT',
          'var BV = "6.0"',
          'veris:action:hacking:variety="Use of backdoor or C2"',
          'veris:action:hacking:vector="Backdoor or C2"',
          'veris:action:malware:variety="Backdoor"',
          'veris:action:malware:variety="Brute force"',
          'veris:action:malware:variety="C2"',
          'veris:action:malware:variety="Downloader"',
          'veris:action:malware:variety="Exploit vuln"',
          'veris:action:malware:variety="Export data"',
          'veris:action:malware:variety="Ram scraper"',
          'veris:action:malware:variety="Ransomware"',
          'veris:action:malware:variety="Scan network"',
          'veris:action:malware:variety="Spyware/Keylogger"',
          'veris:action:malware:vector="Network propagation"',
          'veris:action:malware:vector="Web download"',
          'veris:action:misuse:vector="Remote access"',
          'veris:action:social:target="Finance"',
          'veris:action:social:variety="Extortion"',
          'veris:action:social:variety="Phishing"',
          'veris:action:social:variety="Scam"',
          'veris:action:social:vector="Documents"',
          'veris:actor:motive="Espionage"',
          'veris:actor:motive="Financial"',
          'veris:asset:variety="S - Remote access"',
          'veris:asset:variety="S - SCADA"',
          'veris:asset:variety="T - ATM"',
          'veris:asset:variety="U - Mobile phone"',
          'veris:asset:variety="U - POS terminal"',
          'veris:attribute:confidentiality:data:variety="Credentials"',
          'veris:attribute:confidentiality:state="Transmitted encrypted"',
          'veris:discovery_method="Int - NIDS"',
          'veris:security_incident="Confirmed"',
          'vmray:artifact="ioc"',
          'vmray:verdict="clean"',
          'vmray:verdict="malicious"',
          'vmray:verdict="n/a"',
          'vmray:verdict="suspicious"',
          'vmray:vti_analysis_score="-1/5"',
          'vmray:vti_analysis_score="1/5"',
          'vmray:vti_analysis_score="2/5"',
          'vmray:vti_analysis_score="3/5"',
          'vmray:vti_analysis_score="4/5"',
          'vmray:vti_analysis_score="5/5"',
          'workflow:state="complete"',
          'workflow:state="draft"',
          'workflow:state="incomplete"',
          'workflow:state="ongoing"',
          'workflow:state="rejected"',
          'workflow:state="release"',
          'workflow:todo="add-context"',
          'workflow:todo="add-missing-misp-galaxy-cluster-values"',
          'workflow:todo="add-mitre-attack-cluster"',
          'workflow:todo="add-tagging"',
          'workflow:todo="additional-task"',
          'workflow:todo="check-passive-dns-for-shared-hosting"',
          'workflow:todo="create-event"',
          'workflow:todo="create-missing-misp-galaxy"',
          'workflow:todo="create-missing-misp-galaxy-cluster"',
          'workflow:todo="create-missing-misp-galaxy-cluster-relationship"',
          'workflow:todo="create-missing-misp-galaxy-cluster-values"',
          'workflow:todo="create-missing-relationship"',
          'workflow:todo="do-not-delete"',
          'workflow:todo="expansion"',
          'workflow:todo="preserve-evidence"',
          'workflow:todo="release-requested"',
          'workflow:todo="review"',
          'workflow:todo="review-before-publication"',
          'workflow:todo="review-classification"',
          'workflow:todo="review-for-false-positive"',
          'workflow:todo="review-for-privacy"',
          'workflow:todo="review-the-grammar"',
          'workflow:todo="review-the-source-credibility"',
          'zloader'
        ],
        placeholder: 'Pick a tag'
      },
      {
        id: 'relationship_type',
        label: 'Relationship Type',
        type: 'input',
        display_on: {
          action: 'add'
        }
      }
    ],
    is_misp_module: false,
    is_custom: false,
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    id: 'telegram-send-alert',
    name: 'Telegram Send Alert',
    version: '0.1',
    description: 'Send a message alert to a Telegram channel',
    icon_path: 'Telegram.png',
    inputs: 1,
    outputs: 1,
    support_filters: false,
    params: [
      {
        id: 'bot_token',
        label: 'Telegram Bot Token',
        type: 'input',
        placeholder: 'bot123:ABC'
      },
      {
        id: 'chat_id',
        label: 'Telegram Chat id',
        type: 'input',
        placeholder: '123'
      },
      {
        id: 'message_body_template',
        label: 'Message Body Template',
        type: 'textarea',
        placeholder: 'Template redendered using Jinja2'
      }
    ],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    expect_misp_core_format: false,
    icon: '',
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    id: 'webhook',
    name: 'Webhook',
    version: '0.6',
    description: 'Allow to perform custom callbacks to the provided URL',
    icon_path: 'webhook.png',
    inputs: 1,
    outputs: 1,
    support_filters: false,
    params: [
      {
        id: 'url',
        label: 'URL',
        type: 'input',
        placeholder: 'https://example.com/test'
      },
      {
        id: 'content_type',
        label: 'Content type',
        type: 'select',
        default: 'json',
        options: {
          json: 'application/json',
          form: 'application/x-www-form-urlencoded'
        }
      },
      {
        id: 'request_method',
        label: 'HTTP Request Method',
        type: 'select',
        default: 'post',
        options: {
          post: 'POST',
          get: 'GET',
          put: 'PUT',
          delete: 'DELETE'
        }
      },
      {
        id: 'self_signed',
        label: 'Self-signed certificates',
        type: 'select',
        default: 'deny',
        options: {
          deny: 'Deny self-signed certificates',
          allow: 'Allow self-signed certificates'
        }
      },
      {
        id: 'payload',
        label: 'Payload (leave empty for roaming data)',
        type: 'textarea',
        default: '',
        placeholder: ''
      },
      {
        id: 'headers',
        label: 'Headers',
        type: 'textarea',
        placeholder: 'Authorization: foobar'
      }
    ],
    is_misp_module: false,
    blocking: false,
    is_custom: false,
    expect_misp_core_format: false,
    icon: '',
    icon_class: '',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    blocking: false,
    is_misp_module: true,
    id: 'mattermost',
    name: 'mattermost',
    description: 'Simplistic module to send message to a Mattermost channel.',
    icon: 'python',
    icon_class: 'fab',
    inputs: 1,
    outputs: 1,
    support_filters: true,
    params: [
      {
        id: 'mattermost_hostname',
        label: 'Mattermost Hostname',
        placeholder: 'example.mattermost.com',
        type: 'input'
      },
      {
        id: 'bot_access_token',
        label: 'Bot Access Token',
        placeholder: '',
        type: 'input'
      },
      {
        id: 'channel_id',
        label: 'Channel Id',
        placeholder: '',
        type: 'input'
      },
      {
        id: 'message_template',
        label: 'Message Template',
        placeholder: 'The **template** will be rendered using *Jinja2*!',
        type: 'textarea'
      }
    ],
    is_custom: false,
    expect_misp_core_format: false,
    version: '0.1',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  },
  {
    blocking: false,
    is_misp_module: true,
    id: 'testaction',
    name: 'testaction',
    description:
      'This module is merely a test, always returning true. Triggers on event publishing.',
    icon: 'python',
    icon_class: 'fab',
    inputs: 1,
    outputs: 1,
    support_filters: false,
    params: [
      {
        id: 'foo',
        label: 'Foo',
        placeholder: 'xyz',
        type: 'input'
      },
      {
        id: 'data_extraction_path',
        label: 'Data Extraction Path',
        placeholder: 'Attribute.{n}.AttributeTag.{n}.Tag.name',
        type: 'input',
        _isHashPath: true
      }
    ],
    is_custom: false,
    expect_misp_core_format: false,
    version: '0.1',
    multiple_output_connection: false,
    saved_filters: [
      {
        text: 'selector',
        value: ''
      },
      {
        text: 'value',
        value: ''
      },
      {
        text: 'operator',
        value: ''
      },
      {
        text: 'path',
        value: ''
      }
    ],
    module_type: 'action',
    disabled: true
  }
];
