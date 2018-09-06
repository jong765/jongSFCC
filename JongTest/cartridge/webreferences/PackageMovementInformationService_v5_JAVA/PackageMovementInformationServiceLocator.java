/**
 * PackageMovementInformationServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.fedex.ws.packagemovementinformationservice.v5;

public class PackageMovementInformationServiceLocator extends org.apache.axis.client.Service implements com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationService {

    public PackageMovementInformationServiceLocator() {
    }


    public PackageMovementInformationServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public PackageMovementInformationServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for PackageMovementInformationServicePort
    private java.lang.String PackageMovementInformationServicePort_address = "https://wsbeta.fedex.com:443/web-services";

    public java.lang.String getPackageMovementInformationServicePortAddress() {
        return PackageMovementInformationServicePort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String PackageMovementInformationServicePortWSDDServiceName = "PackageMovementInformationServicePort";

    public java.lang.String getPackageMovementInformationServicePortWSDDServiceName() {
        return PackageMovementInformationServicePortWSDDServiceName;
    }

    public void setPackageMovementInformationServicePortWSDDServiceName(java.lang.String name) {
        PackageMovementInformationServicePortWSDDServiceName = name;
    }

    public com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationPortType getPackageMovementInformationServicePort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(PackageMovementInformationServicePort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getPackageMovementInformationServicePort(endpoint);
    }

    public com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationPortType getPackageMovementInformationServicePort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationServiceSoapBindingStub _stub = new com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationServiceSoapBindingStub(portAddress, this);
            _stub.setPortName(getPackageMovementInformationServicePortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setPackageMovementInformationServicePortEndpointAddress(java.lang.String address) {
        PackageMovementInformationServicePort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationServiceSoapBindingStub _stub = new com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationServiceSoapBindingStub(new java.net.URL(PackageMovementInformationServicePort_address), this);
                _stub.setPortName(getPackageMovementInformationServicePortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("PackageMovementInformationServicePort".equals(inputPortName)) {
            return getPackageMovementInformationServicePort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PackageMovementInformationService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PackageMovementInformationServicePort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("PackageMovementInformationServicePort".equals(portName)) {
            setPackageMovementInformationServicePortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
